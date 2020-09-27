using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoronaShopBE.Dto
{
    public class Seller
    {
        public class User
        {
            [JsonProperty("Credentials")]
            public Credentials credentials { get; set; }

            [JsonProperty("Shops")]
            public List<Shop> shops { get; set; }

        }

        
    }
}
