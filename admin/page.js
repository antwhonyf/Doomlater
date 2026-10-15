"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wallet,
  AlertTriangle,
  Plus,
  TrendingUp,
  Package,
  Calendar,
  Lock,
  ArrowLeft,
} from "lucide-react";

export default function AdminDashboard() {
  const [pestañaActiva, setPestañaActiva] = useState("finanzas");

  const [cuentas] = useState([
    { id: 1, nombre: "Binance (USDT)", moneda: "USDT", saldo: 645.5 },
    { id: 2, nombre: "Efectivo Caja ($)", moneda: "USD", saldo: 320.0 },
    { id: 3, nombre: "Pago Móvil / Banco", moneda: "USD (Eq.)", saldo: 185.2 },
  ]);

  const [operaciones] = useState([
    {
      id: 1,
      concepto: "Nintendo Switch OLED (Compra/Venta + Magia)",
      tipo: "compra_venta",
      fecha_ingreso: "2026-10-05",
      costo_compra: 190,
      inversion_taller: 25,
      detalle_inversion: "Chip RP2040 + MicroSD 128GB + Estaño/Flux",
      precio_venta: 310,
      cuenta: "Binance (USDT)",
      estado: "completado",
    },
    {
      id: 2,
      concepto: "Cambio de Puerto HDMI PS4 Pro + Mantenimiento",
      tipo: "servicio_tecnico",
      fecha_ingreso: "2026-10-10",
      costo_compra: 0,
      inversion_taller: 6,
      detalle_inversion: "1x Puerto HDMI PS4 + Pasta térmica",
      precio_venta: 45,
      cuenta: "Pago Móvil / Banco",
      estado: "completado",
    },
    {
      id: 3,
      concepto: "Control DualSense PS5 (Con Drift)",
      tipo: "compra_venta",
      fecha_ingreso: "2026-10-14",
      costo_compra: 25,
      inversion_taller: 8,
      detalle_inversion: "Par de Joysticks Hall Effect",
      precio_venta: 60,
      cuenta: "Efectivo Caja ($)",
      estado: "en_venta",
    },
  ]);

  const [insumos] = useState([
    { id: 1, nombre: "Puertos HDMI PS4 / PS5", categoria: "Repuesto", stock: 2, minimo: 5, costo: 3.5 },
    { id: 2, nombre: "Flux Amtech (Jeringa 10cc)", categoria: "Insumo Taller", stock: 1, minimo: 2, costo: 8.0 },
    { id: 3, nombre: "Joysticks Hall Effect (PS5/Xbox)", categoria: "Repuesto", stock: 12, minimo: 4, costo: 4.0 },
    { id: 4, nombre: "Pasta Térmica Alta Conductividad", categoria: "Insumo Taller", stock: 4, minimo: 2, costo: 6.5 },
  ]);

  const operacionesCompletadas = operaciones.filter((op) => op.estado === "completado");

  const gananciaMesTotal = operacionesCompletadas.reduce(
    (acc, op) => acc + (op.precio_venta - (op.costo_compra + op.inversion_taller)),
    0
  );

  const ingresosPorServicios = operacionesCompletadas
    .filter((op) => op.tipo === "servicio_tecnico")
    .reduce((acc, op) => acc + (op.precio_venta - op.inversion_taller), 0);

  const ingresosPorVentas = operacionesCompletadas
    .filter((op) => op.tipo !== "servicio_tecnico")
    .reduce((acc, op) => acc + (op.precio_venta - (op.costo_compra + op.inversion_taller)), 0);

  const insumosCriticos = insumos.filter((item) => item.stock <= item.minimo);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-10 font-sans">
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800 pb-6 mb-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white text-xs mb-2 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Volver a la tienda
          </Link>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Lock className="w-3.5 h-3.5" /> Acceso Privado de Socios
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Panel de Finanzas y Taller
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setPestañaActiva("finanzas")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              pestañaActiva === "finanzas"
                ? "bg-zinc-100 text-zinc-950"
                : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
            }`}
          >
            Finanzas y Operaciones
          </button>
          <button
            onClick={() => setPestañaActiva("taller")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
              pestañaActiva === "taller"
                ? "bg-zinc-100 text-zinc-950"
                : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
            }`}
          >
            Inventario y Taller
            {insumosCriticos.length > 0 && (
              <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full text-xs">
                {insumosCriticos.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-8">
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {cuentas.map((cuenta) => (
            <div
              key={cuenta.id}
              className="bg-zinc-900/70 border border-zinc-800/80 rounded-xl p-5 flex flex-col justify-between"
            >
              <div className="flex justify-between items-center text-zinc-400 text-sm">
                <span>{cuenta.nombre}</span>
                <Wallet className="w-4 h-4 text-zinc-500" />
              </div>
              <div className="mt-4">
                <span className="text-2xl font-bold text-white">
                  ${cuenta.saldo.toFixed(2)}
                </span>
                <span className="text-xs text-zinc-500 ml-2">{cuenta.moneda}</span>
              </div>
            </div>
          ))}

          <div className="bg-emerald-950/30 border border-emerald-800/50 rounded-xl p-5 flex flex-col justify-between">
            <div className="flex justify-between items-center text-emerald-400 text-sm font-medium">
              <span>Ganancia Neta (Mes)</span>
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <span className="text-2xl font-bold text-emerald-300">
                +${gananciaMesTotal.toFixed(2)}
              </span>
              <div className="flex justify-between text-xs text-zinc-400 mt-2 pt-2 border-t border-emerald-800/30">
                <span>Ventas: +${ingresosPorVentas}</span>
                <span>Servicios: +${ingresosPorServicios}</span>
              </div>
            </div>
          </div>
        </section>

        {insumosCriticos.length > 0 && (
          <div className="bg-amber-950/20 border border-amber-800/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-sm">
                <span className="font-semibold text-amber-300">
                  Atención en el taller:
                </span>{" "}
                <span className="text-zinc-300">
                  Tienes {insumosCriticos.length} insumos por agotarse (
                  {insumosCriticos.map((i) => `${i.nombre}: quedan ${i.stock}`).join(", ")}
                  ).
                </span>
              </div>
            </div>
            <button
              onClick={() => setPestañaActiva("taller")}
              className="text-xs font-medium text-amber-300 hover:underline shrink-0"
            >
              Ver inventario completo →
            </button>
          </div>
        )}

        {pestañaActiva === "finanzas" && (
          <section className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-semibold">
                  Registro de Compras, Inversiones y Ventas
                </h2>
                <p className="text-xs text-zinc-400">
                  Control exacto de qué se compró, qué se le metió en taller y cuánto dejó de ganancia.
                </p>
              </div>
              <button className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition">
                <Plus className="w-4 h-4" /> Nueva Operación
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400 text-xs uppercase bg-zinc-900/80">
                    <th className="py-3.5 px-4">Equipo / Servicio</th>
                    <th className="py-3.5 px-4">Fecha</th>
                    <th className="py-3.5 px-4">Costo Compra</th>
                    <th className="py-3.5 px-4">Inversión Taller</th>
                    <th className="py-3.5 px-4">Precio Venta</th>
                    <th className="py-3.5 px-4">Ganancia Neta</th>
                    <th className="py-3.5 px-4">Cuenta / Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {operaciones.map((op) => {
                    const ganancia = op.precio_venta - (op.costo_compra + op.inversion_taller);
                    return (
                      <tr key={op.id} className="hover:bg-zinc-900/40 transition">
                        <td className="py-4 px-4">
                          <div className="font-medium text-zinc-100">{op.concepto}</div>
                          <div className="text-xs text-zinc-500 mt-0.5">
                            Insumos: {op.detalle_inversion}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-zinc-400 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                            {op.fecha_ingreso}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-zinc-300">${op.costo_compra}</td>
                        <td className="py-4 px-4 text-amber-400/90">+${op.inversion_taller}</td>
                        <td className="py-4 px-4 font-medium text-white">${op.precio_venta}</td>
                        <td className="py-4 px-4">
                          <span className="font-bold text-emerald-400">
                            +${ganancia.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-xs text-zinc-300">{op.cuenta}</div>
                          <span
                            className={`inline-block mt-1 px-2 py-0.5 rounded text-[11px] font-medium ${
                              op.estado === "completado"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            }`}
                          >
                            {op.estado === "completado" ? "Cobrado" : "En Venta / Taller"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {pestañaActiva === "taller" && (
          <section className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-semibold">
                  Insumos del Taller y Repuestos
                </h2>
                <p className="text-xs text-zinc-400">
                  El sistema te avisa automáticamente cuando un repuesto o consumible llega al mínimo.
                </p>
              </div>
              <button className="bg-zinc-100 hover:bg-white text-zinc-950 font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition">
                <Plus className="w-4 h-4" /> Agregar Insumo / Producto
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400 text-xs uppercase bg-zinc-900/80">
                    <th className="py-3.5 px-4">Insumo / Repuesto</th>
                    <th className="py-3.5 px-4">Categoría</th>
                    <th className="py-3.5 px-4">Stock Actual</th>
                    <th className="py-3.5 px-4">Mínimo</th>
                    <th className="py-3.5 px-4">Costo Unitario</th>
                    <th className="py-3.5 px-4">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {insumos.map((item) => {
                    const porAgotarse = item.stock <= item.minimo;
                    return (
                      <tr key={item.id} className="hover:bg-zinc-900/40 transition">
                        <td className="py-4 px-4 font-medium text-zinc-100 flex items-center gap-2">
                          <Package className="w-4 h-4 text-zinc-500" />
                          {item.nombre}
                        </td>
                        <td className="py-4 px-4 text-zinc-400">{item.categoria}</td>
                        <td className="py-4 px-4 font-bold text-white">{item.stock} uds.</td>
                        <td className="py-4 px-4 text-zinc-500">{item.minimo} uds.</td>
                        <td className="py-4 px-4 text-zinc-300">${item.costo.toFixed(2)}</td>
                        <td className="py-4 px-4">
                          {porAgotarse ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                              <AlertTriangle className="w-3 h-3" /> Por agotarse (Comprar)
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Disponible
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}