using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoronaShopBE.Dto;
using System.Web;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;
using System.Net.Http.Headers;
using System.Threading;

namespace CoronaShopBE.Database.restdb_implementation
{
    public class restDB : DatabaseInterface
    {
        private string m_sUrl;
        private string m_sKey;
        private HttpClient m_pClient;
        public restDB(string url, string key)
        {
            m_sUrl = url;
            m_sKey = key;
            m_pClient = new HttpClient();
            m_pClient.DefaultRequestHeaders.Add("x-apikey", m_sKey);
            m_pClient.DefaultRequestHeaders.Add("cache-control", "no-cache");
        }
        public async Task AddNewSeller(Seller seller)
        {
            var data = new StringContent(JsonConvert.SerializeObject(seller), Encoding.UTF8, "application/json");
            var response = await m_pClient.PostAsync(m_sUrl + "sellers", data);
            string result = response.Content.ReadAsStringAsync().Result;
            Log.Write(result);
        }

        public async Task<bool> checkItemExist(Seller seller)
        {
            string query =  m_sUrl + $"sellers?q={{\"Credentials.email\":\"{seller.credentials.email}\"}}";
            Log.Write($"sending query: {query}");
            var result = await m_pClient.GetAsync(query);
            string received_json = result.Content.ReadAsStringAsync().Result;
            Log.Write($"query: {query} returned {received_json}");
            
            List<Seller> seller_t;
            bool ret = false;
            try
            {
                seller_t = JsonConvert.DeserializeObject<List<Seller>>(received_json);
                ret = seller_t.Count > 0;

            }catch(Exception exc)
            {
                Log.Write(exc.ToString());
            }
            return ret;
        }

        private Seller parseSellerFromString(string jsonedSellers) {
            // we should receive one seller, but db query returns always list
            List<Seller> seller_t = new List<Seller>();
            bool ret = false;
            
            try
            {
                seller_t = JsonConvert.DeserializeObject<List<Seller>>(jsonedSellers);
                ret = seller_t.Count > 0;

            }
            catch (Exception exc)
            {
                Log.Write(exc.ToString());
            }
            
            return ret ? seller_t[0] : null;
        }

        public async Task<Seller> getSellerByEmail(Credentials credentials)
        {
            string query = m_sUrl + $"sellers?q={{\"Credentials.email\":\"{credentials.email}\"}}";
            var received_json = this.send(query).Result;
            return parseSellerFromString(received_json);
        }

        public Seller getSellerFromShop(string shopId)
        {
            Shop shop = null;
            string jsonedShop = getShopByLink(shopId);
            Log.Write($"received shop: {jsonedShop}");

            //we receive the whole seller object when querying this db
            Seller seller = parseSellerFromString(jsonedShop);
            return seller;
        }

        public Shop getShop(string shopId)
        {
            Shop shop = null;
            string jsonedShop = getShopByLink(shopId);
            Log.Write($"received shop: {jsonedShop}");

            //we receive the whole seller object when querying this db
            Seller seller = parseSellerFromString(jsonedShop);
            if (seller != null)
            {
                foreach (var shop_ in seller.shops)
                {
                    if (shop_.platformLink == shopId)
                    {
                        shop = shop_;
                    }
                }
            }

            return shop;
        }

        public string getShopByLink(string link)
        {
            //?q={"Shops":{"PlatformLink":"asdf"}}
            string q = "sellers?q={\"Shops\":{\"PlatformLink\":\"" + link + "\"}}";
            string query = m_sUrl + q; //$"sellers?q={{\"Shops\":{{\"PlatformLink\":\"{link}\"}}";
            var res = send(query).Result;
            return res;
        }

        private async Task<string> send(string query)
        {
            var result = await m_pClient.GetAsync(query);
            var received_json = result.Content.ReadAsStringAsync().Result;
            /*Log.Write($"query: {query} returned {received_json}");*/
            return received_json;
        }

        public bool AddNewShop(Seller seller)
        {
            var task = getSellerByEmail(seller.credentials);
            task.Wait();
            Seller dbSeller = task.Result;
            if (dbSeller == null)
            {
                Log.Write("error occured while trying to receive seller");
                return false;
            }

            string query = "sellers/"+dbSeller._id;
            
            string content_core = JsonConvert.SerializeObject(seller.shops[0]);

            string content = "{\"$push\":{\"Shops\":" + content_core + "}}";
            var putTask = sendPut(query, content);
            var res = putTask.Result;
            return true;
        }

        private async Task<string> sendPut(string query, string jsonedContent ) {
            var httpContent = new StringContent(jsonedContent, Encoding.UTF8, "application/json");
            var result = await m_pClient.PutAsync(m_sUrl+ query,httpContent);
            var received_json = result.Content.ReadAsStringAsync().Result;
            return received_json;
            
        }

        public bool DeleteShop(string shopID, Seller seller)
        {
//         https://<dbname>.restdb.io/rest/blog/588f439418f328ec5e024277
//          { "$pull": { "comments": "This is a comment to a blog post."} }
            string q = "sellers/"+seller._id;
            Shop shopToDelete = getShop(shopID);

            if(shopToDelete == null)
            {
                Log.Write("Shop to delete is null.");
                return false;
            }
            
            string content_core = JsonConvert.SerializeObject(shopToDelete);
            string content = "{\"$pull\":{\"Shops\":" + content_core + "}}";
            var putTask = sendPut(q, content);
            var res = putTask.Result;
            return true;
        }

        private Shop extractShop(Seller seller, string shopID)
        {
            Shop shopToModify = null;
            for (int i = 0; i < seller.shops.Count; i++)
            {
                if (seller.shops[i].platformLink == shopID)
                {
                    shopToModify = seller.shops[i];
                    break;
                }
            }
            return shopToModify;
        }


        private bool UpdateShop(Shop updatedShop, Seller shopOwner)
        {
            //update has only the old, shopowner has only the new ?
            // This database not supporting updating objects nested in nested arrays
            // therefore we replace the shop
            string query = "sellers/" + shopOwner._id;
            bool shopDeleted = DeleteShop(updatedShop.platformLink, shopOwner);
            
            if (shopDeleted)
            {
                string content_core = JsonConvert.SerializeObject(updatedShop);

                string content = "{\"$push\":{\"Shops\":" + content_core + "}}";
                var putTask = sendPut(query, content);
                var res = putTask.Result;
                Log.Write($"Successfully updated shop");

                return true;
            }
            Log.Write($"Failed updating shop, failed removing existing document.");

            return false;
        }

        public bool UpdateShop(string shopID, Seller shopOwner)
        {
            // assuming this is the correct seller
            // Business logic should validate the seller
            Shop shopToModify = extractShop(shopOwner, shopID);

            if (shopToModify == null)
            {
                // shop not exist
                return false;
            }

            return UpdateShop(shopToModify, shopOwner);
        }

        public bool addOrderToSeller(Seller shopOwner, Order order)
        {
            string query = "sellers/" + shopOwner._id;
            //bool shopDeleted = DeleteShop(updatedShop.platformLink, shopOwner);

            string content_core = JsonConvert.SerializeObject(order);

            string content = "{\"$push\":{\"Orders\":" + content_core + "}}";
            var putTask = sendPut(query, content);
            var res = putTask.Result;
            Log.Write($"Successfully updated order");

            return true;
        }

        public bool removeOrderFromSeller(Seller shopOwner, Order order)
        {
            string q = "sellers/" + shopOwner._id;

            string content_core = JsonConvert.SerializeObject(order);
            string content = "{\"$pull\":{\"Shops\":" + content_core + "}}";
            var putTask = sendPut(q, content);
            var res = putTask.Result;
            return true;
        }
    }
}
