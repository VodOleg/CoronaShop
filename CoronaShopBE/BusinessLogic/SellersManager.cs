using CoronaShopBE.CommonUtils;
using CoronaShopBE.Database;
using CoronaShopBE.Database.restdb_implementation;
using CoronaShopBE.Dto;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoronaShopBE.BusinessLogic
{
    public class SellersManager
    {
        DatabaseAccess m_pDB; 
        //private readonly ILogger m_pLogger;
        public SellersManager(DatabaseAccess db)
        {
            m_pDB = db;
        }

        public bool handleNewSeller(Credentials credentials)
        {
            //TODO: check if user already exists
            using (var seller_ = new Seller(credentials))
            {

                var checkingDatabase = m_pDB.checkItemExist(seller_);
                checkingDatabase.Wait();

                if (checkingDatabase.Result)
                {
                    Log.Write($"user {credentials} already exist.");
                    return false;
                }

            }
            // user not exist can proceed creating new with that mail.
            Seller seller = new Seller(credentials);
            m_pDB.AddNewSeller(seller);
            return true;
        }

        public bool addNewOrder(string shopID, Order order)
        {
            string orderID = Utils.generateID();
            //get the seller
            Seller shopOwner = m_pDB.getSellerFromShop(shopID);

            //verify order ID uniqueness 
            List<string> allOrders = new List<string>();
            if ( shopOwner.orders != null)
            {
                foreach (var order_ in shopOwner.orders)
                {
                    allOrders.Add(order_.orderID);
                }
            }
            
            //check if he already have order with this id
            while (allOrders.Contains(orderID))
            {
                orderID = Utils.generateID();
            }

            //update the order
            order.orderID = orderID;
            order.shopID = shopID;

            //submit new order to seller
            bool ret = m_pDB.addOrderToSeller(shopOwner, order);

            return true;
        }

        public Seller handleSellerLoginTry(Credentials creds)
        {
            var task = m_pDB.getSellerByEmail(creds);
            task.Wait();
            Seller ret = task.Result;
            if (ret != null && ret.credentials.Equals(creds))
                return ret;
            return null;
        }

        public bool handleNewShop(Seller seller)
        {
            bool updated = m_pDB.AddNewShop(seller);
            return updated;
        }

        public bool DeleteShop(string shopID, Credentials credentials)
        {
            // first validate credentials against this shop user credentials
            Task<Seller> task_ = m_pDB.getSellerByEmail(credentials);
            task_.Wait();
            Seller shopOwner = task_.Result;
            
            if (shopOwner.credentials.pw != credentials.pw)
            {
                return false;
            }

            //now remove the shop
            bool shopDeleted = m_pDB.DeleteShop(shopID, shopOwner);


            return shopDeleted;
        }

        internal bool updateShop(string shopID, Seller seller)
        {
            if (!isShopOwner(shopID, seller))
            {
                Log.Write("Attempt to modify shop with no seller credentials!!");
                return false;
            }

            //now remove the shop
            bool shopUpdated = m_pDB.UpdateShop(shopID, seller);


            return shopUpdated;
        }

        private bool isShopOwner(string shopID, Seller requestedSeller)
        {
            Task<Seller> task_ = m_pDB.getSellerByEmail(requestedSeller.credentials);
            task_.Wait();
            Seller shopOwner = task_.Result;

            return (shopOwner.credentials.pw == requestedSeller.credentials.pw);
        }
    }
}
