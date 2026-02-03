import Session from '../models/mongodb/Session.js';

//Resuemn semanal de carga de entrenamiento
export const getWeeklyWorkload = async (userId) => {
    const sieteDiasAtras = new Date();
    sieteDiasAtras.setDate(sieteDiasAtras.getDate() - 7);

    return await Session.aggregate([
        { 
            $match: { 
                usuario_id: userId, 
                fecha: { $gte: sieteDiasAtras } 
            } 
        },
        { 
            $unwind: "$ejercicios_realizados" 
        },
        { 
            $unwind: "$ejercicios_realizados.sets" 
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$fecha" } },
                volumenTotal: { 
                    $sum: { $multiply: ["$ejercicios_realizados.sets.peso", "$ejercicios_realizados.sets.reps"] } 
                }
            }
        },
        { $sort: { "_id": 1 } }
    ]);
};

//Reparto por grupos musculares (o ejercicios)
export const getMuscleDistribution = async (userId) => {
    return await Session.aggregate([
        { $match: { usuario_id: userId } },
        { $unwind: "$ejercicios_realizados" },
        {
            $group: {
                _id: "$ejercicios_realizados.nombre_ejercicio", // O .grupo_muscular si lo guardas
                count: { $sum: 1 }
            }
        },
        { $sort: { count: -1 } }
    ]);
};

//Totales históricos (Kilos totales y sesiones totales)
export const getLifetimeStats = async (userId) => {
    // 1. Obtener la PRIMERA sesión (la más antigua)
    const primeraSesion = await Session.find({ usuario_id: userId })
        .sort({ fecha: 1 })
        .limit(1);

    // 2. Obtener la ÚLTIMA sesión (la más reciente)
    const ultimaSesion = await Session.find({ usuario_id: userId })
        .sort({ fecha: -1 })
        .limit(1);

    // Función auxiliar para calcular intensidad media (kg/rep) de una sesión
    const calcularIntensidad = (sesion) => {
        if (!sesion || sesion.length === 0) return 0;
        let volumenTotal = 0;
        let repsTotales = 0;

        sesion[0].ejercicios_realizados.forEach(ej => {
            ej.sets.forEach(set => {
                volumenTotal += (set.peso * set.reps);
                repsTotales += set.reps;
            });
        });

        return repsTotales > 0 ? (volumenTotal / repsTotales) : 0;
    };

    const intensidadInicial = calcularIntensidad(primeraSesion);
    const intensidadActual = calcularIntensidad(ultimaSesion);

    // 3. Calcular Porcentaje de Mejora
    let porcentajeMejora = 0;
    if (intensidadInicial > 0) {
        porcentajeMejora = ((intensidadActual - intensidadInicial) / intensidadInicial) * 100;
    }

    // 4. Estadísticas globales (Totales)
    const totalSesiones = await Session.countDocuments({ usuario_id: userId });
    
    // Suma de kilos totales de toda la vida (usando agregación rápida)
    const kilosVida = await Session.aggregate([
        { $match: { usuario_id: userId } },
        { $unwind: "$ejercicios_realizados" },
        { $unwind: "$ejercicios_realizados.sets" },
        { $group: { _id: null, total: { $sum: { $multiply: ["$ejercicios_realizados.sets.peso", "$ejercicios_realizados.sets.reps"] } } } }
    ]);

    return {
        progreso: {
            porcentajeMejora: parseFloat(porcentajeMejora.toFixed(2)),
            mensaje: porcentajeMejora >= 0 ? "Mejora de fuerza detectada" : "En fase de mantenimiento",
            intensidadInicial: parseFloat(intensidadInicial.toFixed(2)),
            intensidadActual: parseFloat(intensidadActual.toFixed(2))
        },
        totales: {
            sesionesCompletadas: totalSesiones,
            kilosLevantadosAcumulados: kilosVida[0]?.total || 0
        }
    };
};