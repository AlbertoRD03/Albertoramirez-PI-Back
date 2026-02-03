import Session from '../models/mongodb/Session.js';

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