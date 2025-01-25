// EmpleadoPorHora.cs
public class EmpleadoPorHora : Empleado
{
    public decimal TarifaPorHora { get; set; }
    public int HorasTrabajadas { get; set; }

    public EmpleadoPorHora(string nombre, decimal tarifaPorHora, int horasTrabajadas)
        : base(nombre)
    {
        TarifaPorHora = tarifaPorHora;
        HorasTrabajadas = horasTrabajadas;
    }

    public override decimal CalcularSalario()
    {
        return TarifaPorHora * HorasTrabajadas; // Salario basado en horas trabajadas
    }
}