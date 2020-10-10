﻿using System;
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

        public async Task<Seller> getSellerByEmail(Credentials credentials)
        {
            List<Seller> seller_t = new List<Seller>();
            bool ret = false;
            using(var seller = new Seller(credentials))
            {
                string query = m_sUrl + $"sellers?q={{\"Credentials.email\":\"{seller.credentials.email}\"}}";
                var received_json = this.send(query).Result;

                try
                {
                    seller_t = JsonConvert.DeserializeObject<List<Seller>>(received_json);
                    ret = seller_t.Count > 0;

                }
                catch (Exception exc)
                {
                    Log.Write(exc.ToString());
                }

            }
            return ret ? seller_t[0] : null;
        }

        public async Task<Shop> getShopByLink(string link)
        {
            string query = m_sUrl + $"sellers?q={{\"Shops\":{{\"PlatformLink\":\"{link}\"}}";
            string res = send(query).Result;
            return null;
        }

        private async Task<string> send(string query)
        {
            var result = await m_pClient.GetAsync(query);
            string received_json = result.Content.ReadAsStringAsync().Result;
            Log.Write($"query: {query} returned {received_json}");
            return received_json;
        }

    }
}
