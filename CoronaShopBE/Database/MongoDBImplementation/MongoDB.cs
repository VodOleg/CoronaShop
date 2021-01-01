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

        public bool addItemToShop(string shopID, Seller shopOwner, Item newItem)
        {
            throw new NotImplementedException();
        }

        public Task AddNewSeller(Seller seller)
        {
            throw new NotImplementedException();
        }

        public bool AddNewShop(Seller seller)
        {
            throw new NotImplementedException();
        }

        public Task<bool> checkItemExist(Seller seller)
        {
            throw new NotImplementedException();
        }

        public bool DeleteShop(string shopID, Seller shopOwner)
        {
            throw new NotImplementedException();
        }

        public bool editExistingItem(string shopID, Seller shopOwner, Item edittedItem)
        {
            throw new NotImplementedException();
        }

        public Task<Seller> getSellerByEmail(Credentials credentials)
        {
            throw new NotImplementedException();
        }

        public Shop getShop(string shopId)
        {
            throw new NotImplementedException();
        }

        public bool removeItemFromShop(string shopID, Seller shopOwner, Item itemToRemove)
        {
            throw new NotImplementedException();
        }

        public bool updateShop(Seller seller)
        {
            throw new NotImplementedException();
        }

        public bool UpdateShop(string shopID, Seller shopOwner)
        {
            throw new NotImplementedException();
        }
    }
}
