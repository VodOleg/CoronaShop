using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoronaShopBE.Dto;
using System.Web;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;

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
            Log.Write($"query: {query} returned {result}");
            return true;
        } 
    }
}
