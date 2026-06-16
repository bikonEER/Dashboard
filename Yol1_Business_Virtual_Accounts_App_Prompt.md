# Prompt para Codex — App Yol1 Business / Cuentas Virtuales

## Contexto estratégico

Quiero construir una app/prototipo funcional que represente la solución de **Yol1 Business**, una plataforma B2B construida sobre la infraestructura de **ProntoPaga**, enfocada en cuentas virtuales empresariales.

ProntoPaga opera como la infraestructura tecnológica y de pagos por detrás.

Yol1 Business es la capa visible para empresas, comercios, proveedores y clientes corporativos.

## Concepto principal

La app debe mostrar cómo una empresa puede crear y administrar cuentas virtuales para distintos pagadores, proveedores, clientes o unidades de negocio.

Ejemplo:

Una empresa chilena quiere pagarle a un proveedor extranjero.

Yol1 crea una cuenta virtual local asociada a ese proveedor.

El pagador transfiere en moneda local a esa cuenta.

Yol1 identifica automáticamente el origen, el destino y el propósito del pago.

Luego la empresa o proveedor puede:

- Ver el saldo recibido
- Conciliar pagos
- Convertir moneda
- Retirar fondos
- Enviar fondos vía transferencia local o internacional
- Ver historial y trazabilidad

## Objetivo de la app

Crear una app web tipo fintech B2B que muestre:

1. Cuentas virtuales creadas
2. Saldos por cuenta
3. Movimientos recibidos
4. Pagadores asociados
5. Conciliación automática
6. Conversión FX
7. Transferencias / payouts
8. Estado operativo de cada cuenta
9. Vista ejecutiva para una empresa cliente
10. Vista interna para Yol1 / ProntoPaga

## Usuarios de la app

### Cliente empresa

Puede:

- Crear cuentas virtuales
- Asignarlas a proveedores, clientes o referencias de pago
- Ver pagos recibidos
- Descargar conciliaciones
- Solicitar conversión FX
- Solicitar transferencias
- Revisar estados de operación

### Yol1 / ProntoPaga interno

Puede:

- Ver todas las cuentas virtuales
- Monitorear flujos
- Ver alertas operativas
- Revisar pagos pendientes de conciliación
- Ver estado de liquidaciones
- Ver exposición por país, moneda y cliente

## Módulos principales

### 1. Home / Overview

Debe mostrar:

- Total recibido hoy
- Total recibido este mes
- Saldos disponibles
- Número de cuentas virtuales activas
- Pagos pendientes de conciliación
- FX pendiente
- Payouts en proceso
- Alertas operativas

### 2. Cuentas virtuales

Tabla o cards con:

- Nombre de cuenta
- Empresa / proveedor asociado
- País
- Moneda
- Banco / rail
- Número de cuenta virtual
- Saldo disponible
- Estado: activa, pendiente, bloqueada
- Fecha de creación
- Último movimiento

### 3. Detalle de cuenta virtual

- Información bancaria local
- Titular visible
- Identificador interno Yol1
- Cliente asociado
- Pagadores asociados
- Saldo
- Movimientos
- Historial de conciliación
- FX disponible
- Transferencias
- Conversión de moneda

### 4. Movimientos

- Fecha
- Monto
- Moneda
- Pagador
- Cuenta destino
- Estado
- Método de pago
- Referencia
- Match de conciliación
- Comisión
- Monto neto

### 5. Conciliación automática

- Pagos recibidos
- Referencias detectadas
- Match automático
- Confianza del match
- Pagos no conciliados
- Asignación manual

### 6. FX / Conversión

- Conversión entre monedas LATAM y USD
- Tipo de cambio
- Spread
- Monto estimado final
- Confirmación

### 7. Payouts / Transferencias

- Banco local
- Proveedor internacional
- Cuenta bancaria externa
- Otra cuenta virtual

### 8. Clientes / Proveedores

- Administración de entidades
- Referencias de pago
- Cuentas virtuales asociadas
- Historial

### 9. Alertas y riesgo

- Pagos inusuales
- Cuentas sin movimiento
- Pagos sin match
- KYC pendiente
- Payouts retenidos
- Exposición por cliente
- Exposición por país
- Exposición por moneda

## Diseño esperado

Inspiración:

- Qonto
- Airwallex
- Wise Business
- Brex
- Ramp
- Mercury
- Stripe Dashboard

No debe verse como una wallet B2C.

Debe verse como una plataforma financiera empresarial moderna.

## Resultado esperado

Construir una primera versión navegable de la app con datos mockeados.

Incluir:

- Layout principal
- Sidebar
- Home
- Cuentas virtuales
- Detalle de cuenta
- Movimientos
- Conciliación
- FX
- Payouts
- Clientes / proveedores
- Alertas

Usar datos ficticios realistas para Chile, Perú, Colombia, México y Brasil.

El objetivo es mostrar cómo se vería Yol1 Business como producto B2B construido sobre la infraestructura de ProntoPaga.
