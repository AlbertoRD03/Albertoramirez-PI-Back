import * as dashboardService from '../services/dashboard.service.js';

export const getStats = async (req, res) => {
    try {
        const workload = await dashboardService.getWeeklyWorkload(req.user.id);
        
        res.status(200).json({
            periodo: "Últimos 7 días",
            datos: workload
        });
    } catch (error) {
        res.status(500).json({ error: "Error al generar estadísticas de carga" });
    }
};