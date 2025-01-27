using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

// Simulated in-memory data store
var weatherForecasts = new List<WeatherForecast>
{
    new WeatherForecast(DateOnly.FromDateTime(DateTime.Now), 20, "Mild"),
    new WeatherForecast(DateOnly.FromDateTime(DateTime.Now.AddDays(1)), 25, "Warm"),
    new WeatherForecast(DateOnly.FromDateTime(DateTime.Now.AddDays(2)), 30, "Hot")
};

// GET: Obtener todos los recursos
app.MapGet("/weatherforecast", () =>
{
    return Results.Ok(weatherForecasts);
})
.WithName("GetAllWeatherForecasts");

// GET: Obtener un recurso por ID
app.MapGet("/weatherforecast/{id:int}", (int id) =>
{
    if (id < 0 || id >= weatherForecasts.Count)
    {
        return Results.NotFound($"No se encontró el pronóstico con ID {id}.");
    }
    return Results.Ok(weatherForecasts[id]);
})
.WithName("GetWeatherForecastById");

// POST: Crear un nuevo recurso
app.MapPost("/weatherforecast", (WeatherForecast weather) =>
{
    weatherForecasts.Add(weather);
    var id = weatherForecasts.Count - 1;
    return Results.Created($"/weatherforecast/{id}", weather);
})
.WithName("CreateWeatherForecast");

// PUT: Editar un recurso existente
app.MapPut("/weatherforecast/{id:int}", (int id, WeatherForecast updatedWeather) =>
{
    if (id < 0 || id >= weatherForecasts.Count)
    {
        return Results.NotFound($"No se encontró el pronóstico con ID {id}.");
    }

    weatherForecasts[id] = updatedWeather;
    return Results.Ok(updatedWeather);
})
.WithName("UpdateWeatherForecast");

// DELETE: Eliminar un recurso
app.MapDelete("/weatherforecast/{id:int}", (int id) =>
{
    if (id < 0 || id >= weatherForecasts.Count)
    {
        return Results.NotFound($"No se encontró el pronóstico con ID {id}.");
    }

    weatherForecasts.RemoveAt(id);
    return Results.NoContent();
})
.WithName("DeleteWeatherForecast");

// GET: Buscar por resumen
app.MapGet("/weatherforecast/search", (string summary) =>
{
    var results = weatherForecasts.Where(w => w.Summary?.Contains(summary, StringComparison.OrdinalIgnoreCase) == true).ToList();

    if (!results.Any())
    {
        return Results.NotFound($"No se encontraron pronósticos que contengan '{summary}' en el resumen.");
    }

    return Results.Ok(results);
})
.WithName("SearchWeatherForecasts");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
