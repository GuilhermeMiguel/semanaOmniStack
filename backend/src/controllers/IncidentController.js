//Essa classe exporta um objeto com os metodos
const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        //Se o parametro page nao existir, por padrao ele é 1
        const { page = 1} = request.query;

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')    
            .limit(5) //Limita a 5 resultados 
            .offset( (page - 1) * 5) //Ele pula elementos pra começar
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]);
        
        //Para retornar a quantidade eu retorno PELO CABEÇALHO DA RESPOSTA 
        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },
    
    async create (request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        //Esse id entre colchetes significa que ele pega a primeira posicao 
    //do retorno da funcao slq
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id } );
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;
        
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()
        if(incident.ong_id != ong_id){
            return response.status(401);
        }

        return response.status(204).send();
    }
};