import Lot from "./model"

const lotControler = {
    //отримати всі
    async get: function (request, response) {
        try {
            const list = await Lot.find(makeQueryObject(req.query));
            response.send(list);
        }
            catch(error){
            response.status(500).send(error);
        }
    
        function makeQueryObject(query){
            let result = {};        
            if (query.data){
                result.data = {"$lte": (query.minData),"$gte":(query.maxData)};
            }   
            return result; 
        }
    },
    
    async getByDate(req,res){
        try {
            const list = await Lot.findByData.findByData(req.params.minData,req.params.maxData);
            response.send(list);
        }
            catch(error){
            response.status(500).send(error);
        }
    },

    async post (req, res) {
    try {
        const lot = new lot(req.body);
        await lot.save();
        res.send(lot);

        } catch (error) {
        res.status(500).send(error);
        }
    },
    async delete (req, res) {
        try {
            const lot = await Lot.findByIdAndDelete(req.params.id);
            if (!lot)
                res.status(404).send("Not found");
            res.send(lot);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async patch(req, res) {
        try {
            const lot = await Lot.findByIdAndUpdate(req.params.id, req.body,  {new: true});
            if (!lot)
                res.status(404).send("Not found");
            await Lot.save();
            res.send(lot);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

export default lotControler;