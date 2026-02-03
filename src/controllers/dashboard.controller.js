// src/controllers/dashboard.controller.js
import * as dashboardService from '../services/dashboard.service.js';

export const getFullDashboard = async (req, res) => {
    try {
        const userId = req.user.id;

        // Ejecutamos las 3 consultas en paralelo para máxima velocidad
        const [workload, distribution, lifetime] = await Promise.all([
            dashboardService.getWeeklyWorkload(userId),
            dashboardService.getMuscleDistribution(userId),
            dashboardService.getLifetimeStats(userId)
        ]);

        res.status(200).json({
            weeklyWorkload: workload,
            muscleDistribution: distribution,
            lifetimeStats: lifetime
        });
    } catch (error) {
        res.status(500).json({ error: "Error al generar el dashboard completo" });
    }
};