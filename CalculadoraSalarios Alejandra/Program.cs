// Program.cs
using System;
using System.Collections.Generic;

class Program
{
    static void Main(string[] args)
    {
        // Crear una lista de empleados
        List<Empleado> empleados = new List<Empleado>();

        // Agregar un EmpleadoTiempoCompleto
        empleados.Add(new EmpleadoTiempoCompleto("Juan", 36000)); // Salario anual

        // Agregar un EmpleadoPorHora
        empleados.Add(new EmpleadoPorHora("María", 15, 160)); // Tarifa por hora y horas trabajadas

        // Recorrer la lista e imprimir el nombre y salario de cada empleado
        foreach (Empleado empleado in empleados)
        {
            Console.WriteLine(empleado.ToString());
            Console.WriteLine("Salario: " + empleado.CalcularSalario());
            Console.WriteLine();
        }
    }
}