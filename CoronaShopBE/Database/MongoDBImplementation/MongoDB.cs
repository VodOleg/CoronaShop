using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoronaShopBE.Dto;
using MongoDB.Driver;

namespace CoronaShopBE.Database.MongoDBImplementation
{
    public class MongoDB : DatabaseInterface
    {
        private IMongoDatabase db;

        public MongoDB()
        {
            var client = new MongoClient();
            db = client.GetDatabase(GlobalConfig.databaseURL);
        }

        public Task AddNewSeller(Seller seller)
        {
            throw new NotImplementedException();
        }

        public Task<bool> checkItemExist(Seller seller)
        {
            throw new NotImplementedException();
        }
    }
}
