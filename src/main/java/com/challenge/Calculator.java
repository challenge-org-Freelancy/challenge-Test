package com.challenge;

public class Calculator {

    // Adds two numbers
    public int add(int a, int b) {
        return a + b;
    }

    // Subtracts b from a
    public int subtract(int a, int b) {
        return a - b;
    }

    // Multiplies two numbers
    public int multiply(int a, int b) {
        return a * b;
    }

    // Divides a by b
    public int divide(int a, int b) {
        if (b == 0) {
            throw new IllegalArgumentException("Division by zero!");
        }
        return a / b;
    }

    // New method: Returns remainder of a divided by b
    public int modulus(int a, int b) {
        if (b == 0) {
            throw new IllegalArgumentException("Division by zero!");
        }
        return a % b;
    }

    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println("Add: " + calc.add(10, 5));
        System.out.println("Subtract: " + calc.subtract(10, 5));
        System.out.println("Multiply: " + calc.multiply(10, 5));
        System.out.println("Divide: " + calc.divide(10, 5));
        System.out.println("Modulus: " + calc.modulus(10, 5)); // new output
    }
}
