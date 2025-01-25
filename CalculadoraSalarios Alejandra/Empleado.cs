// Empleado.cs
public abstract class Empleado
{
    public string Nombre { get; set; }

    public Empleado(string nombre)
    {
        Nombre = nombre;
    }

    public abstract decimal CalcularSalario();

    public override string ToString()
    {
        return "Empleado: " + Nombre;
    }
}