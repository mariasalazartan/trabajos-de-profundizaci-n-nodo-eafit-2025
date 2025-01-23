using System;

class Program
{
    static void Main(string[] args)
    {
        bool continuar = true;

        while (continuar)
        {
            Console.Clear();
            Console.WriteLine("Calculadora Avanzada por consola (.NET 9)");
            Console.WriteLine("=========================================");

            Console.Write("Introduce el primer numero: ");
            if (!double.TryParse(Console.ReadLine(), out double numero1))
            {
                Console.WriteLine("Entrada inválida. Presiona cualquier tecla para continuar...");
                Console.ReadKey();
                continue;
            }

            Console.Write("Introduce el segundo numero (si no aplica, presiona Enter): ");
            double numero2 = 0;
            string inputNumero2 = Console.ReadLine() ?? "";

            bool segundoNumeroValido = string.IsNullOrWhiteSpace(inputNumero2) || double.TryParse(inputNumero2, out numero2);

            if (!segundoNumeroValido)
            {
                Console.WriteLine("Entrada inválida. Presiona cualquier tecla para continuar...");
                Console.ReadKey();
                continue;
            }

            Console.WriteLine("\nSelecciona una operación:");
            Console.WriteLine("1. Suma");
            Console.WriteLine("2. Resta");
            Console.WriteLine("3. Multiplicación");
            Console.WriteLine("4. División");
            Console.WriteLine("5. Raíz Cuadrada");
            Console.WriteLine("6. Elevar un número al cuadrado");
            Console.WriteLine("7. Logaritmo en base personalizada");
            Console.WriteLine("8. Valor absoluto");
            Console.WriteLine("9. Salir");
            Console.Write("Tu elección: ");

            string operacion = Console.ReadLine() ?? "";
            double resultado1, resultado2;

            switch (operacion)
            {
                case "1": // Suma
                    resultado1 = numero1 + numero2;
                    Console.WriteLine($"Resultado: {resultado1}");
                    break;
                case "2": // Resta
                    resultado1 = numero1 - numero2;
                    Console.WriteLine($"Resultado: {resultado1}");
                    break;
                case "3": // Multiplicación
                    resultado1 = numero1 * numero2;
                    Console.WriteLine($"Resultado: {resultado1}");
                    break;
                case "4": // División
                    if (numero2 == 0)
                    {
                        Console.WriteLine("Error: no se puede dividir por cero.");
                    }
                    else
                    {
                        resultado1 = numero1 / numero2;
                        Console.WriteLine($"Resultado: {resultado1}");
                    }
                    break;
                case "5": // Raíz Cuadrada
                    if (numero1 < 0)
                    {
                        Console.WriteLine("Error: no se puede calcular la raíz cuadrada de un número negativo.");
                    }
                    else
                    {
                        resultado1 = Math.Sqrt(numero1);
                        Console.WriteLine($"Raíz cuadrada de {numero1}: {resultado1}");
                    }
                    if (!string.IsNullOrWhiteSpace(inputNumero2) && numero2 >= 0)
                    {
                        resultado2 = Math.Sqrt(numero2);
                        Console.WriteLine($"Raíz cuadrada de {numero2}: {resultado2}");
                    }
                    break;
                case "6": // Elevar al cuadrado
                    resultado1 = Math.Pow(numero1, 2);
                    Console.WriteLine($"{numero1} elevado al cuadrado: {resultado1}");
                    if (!string.IsNullOrWhiteSpace(inputNumero2))
                    {
                        resultado2 = Math.Pow(numero2, 2);
                        Console.WriteLine($"{numero2} elevado al cuadrado: {resultado2}");
                    }
                    break;
                case "7": // Logaritmo en base personalizada
                    Console.Write("Introduce la base del logaritmo: ");
                    if (!double.TryParse(Console.ReadLine(), out double baseLog) || baseLog <= 0 || baseLog == 1)
                    {
                        Console.WriteLine("Error: la base del logaritmo debe ser mayor que 0 y diferente de 1.");
                    }
                    else
                    {
                        if (numero1 > 0)
                        {
                            resultado1 = Math.Log(numero1, baseLog);
                            Console.WriteLine($"Logaritmo de {numero1} en base {baseLog}: {resultado1}");
                        }
                        else
                        {
                            Console.WriteLine($"Error: el número {numero1} debe ser mayor que 0 para calcular el logaritmo.");
                        }
                        if (!string.IsNullOrWhiteSpace(inputNumero2) && numero2 > 0)
                        {
                            resultado2 = Math.Log(numero2, baseLog);
                            Console.WriteLine($"Logaritmo de {numero2} en base {baseLog}: {resultado2}");
                        }
                    }
                    break;
                case "8": // Valor absoluto
                    resultado1 = Math.Abs(numero1);
                    Console.WriteLine($"Valor absoluto de {numero1}: {resultado1}");
                    if (!string.IsNullOrWhiteSpace(inputNumero2))
                    {
                        resultado2 = Math.Abs(numero2);
                        Console.WriteLine($"Valor absoluto de {numero2}: {resultado2}");
                    }
                    break;
                case "9": // Salir
                    continuar = false;
                    Console.WriteLine("Gracias por usar la calculadora.");
                    break;
                default:
                    Console.WriteLine("Operación no válida.");
                    break;
            }

            if (continuar)
            {
                Console.WriteLine("\nPresione cualquier tecla para continuar...");
                Console.ReadKey();
            }
        }
    }
}
