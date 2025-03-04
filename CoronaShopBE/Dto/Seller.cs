﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoronaShopBE.Dto
{
    public class Seller:IDisposable
    {
        public Seller(string user, string pw)
        {
            credentials = new Credentials(user, pw);
            shops = new List<Shop>();
            orders = new List<Order>();
        }

        public Seller(Credentials credentials_)
        {
            credentials = credentials_;
            shops = new List<Shop>();
            orders = new List<Order>();
        }
        public Seller() { }

        
        [JsonProperty("_id")]
        public string _id { get; set; }

        
        [JsonProperty("Credentials")]
        public Credentials credentials { get; set; }

        [JsonProperty("Shops")]
        public List<Shop> shops { get; set; }

        [JsonProperty("Orders")]
        public List<Order> orders { get; set; }

        public void Dispose()
        {
            credentials = null;
            shops = null;
        }
    }
}
