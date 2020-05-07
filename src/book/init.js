import Lot from "./model";

export default {
    async run(req, res) {
        try {
            await Lot.deleteMany({});
            const lots = [
                {
                    title: "lot1",
                    startPrice: 110,
                    endPrice:140,
                    startData:new Date(20-05-2017),
                    endData:new Date(09-11-2018)
                },
                {
                    title: "lot2",
                    startPrice: 315,
                    endPrice:746,
                    startData:new Date(09-01-2017),
                    endData:new Date(09-01-2019)
                },
                {
                    title: "lot3",
                    startPrice: 1220,
                    endPrice:1400,
                    startData:new Date(09-01-2017),
                    endData:new Date(19-03-2018)
                },
                {
                    title: "lot4",
                    startPrice: 340,
                    endPrice:540,
                    startData:new Date(09-01-2017),
                    endData:new Date(09-03-2017)
                },
                {
                    title: "lot5",
                    startPrice: 1010,
                    endPrice:1020,
                    startData:new Date(23-11-2017),
                    endData:new Date(24-12-2017)
                }
            ];

            lots.forEach(async lot => await new Lot(lot).save());
        } catch (error) {
            console.log(error)
        }
    }
}