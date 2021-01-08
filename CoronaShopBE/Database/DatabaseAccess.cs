using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoronaShopBE.Database.restdb_implementation;
using CoronaShopBE.Dto;
using Microsoft.Extensions.Configuration;

namespace CoronaShopBE.Database
{
    public class DatabaseAccess : DatabaseInterface
    {
        private DatabaseInterface m_pDatabase;
        public DatabaseAccess()
        {
            if(GlobalConfig.databaseURL.Contains("restdb.io"))
            {
                m_pDatabase = new restDB(GlobalConfig.databaseURL, GlobalConfig.databaseKey);
            }
        }
        public Task AddNewSeller(Seller seller)
        {
            return m_pDatabase.AddNewSeller(seller);
            
        }

        public Task<bool> checkItemExist(Seller seller)
        {
            return m_pDatabase.checkItemExist(seller);
        }

        public Task<Seller> getSellerByEmail(Credentials credentials)
        {
            return m_pDatabase.getSellerByEmail(credentials);
        }

        public Shop getShop(string shopId)
        {
            return m_pDatabase.getShop(shopId);
        }

        public bool AddNewShop(Seller seller)
        {
            return m_pDatabase.AddNewShop(seller);
        }

        public bool DeleteShop(string shopID, Seller shopOwner)
        {
            return m_pDatabase.DeleteShop(shopID, shopOwner);
        }

        public bool UpdateShop(string shopID, Seller shopOwner)
        {
            return m_pDatabase.UpdateShop(shopID, shopOwner);
        }

        public Seller getSellerFromShop(string shopId)
        {
            return m_pDatabase.getSellerFromShop(shopId);
        }

        public bool addOrderToSeller(Seller shopOwner, Order order)
        {
            return m_pDatabase.addOrderToSeller(shopOwner, order);
        }

        public bool removeOrderFromSeller(Seller shopOwner, Order order)
        {
            return removeOrderFromSeller(shopOwner, order);
        }
    }
}
