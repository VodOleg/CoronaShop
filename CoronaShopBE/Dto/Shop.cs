using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoronaShopBE.Dto
{
    public class Shop
    {
        [JsonProperty("Name")]
        public string name { get; set; }

        [JsonProperty("Description")]
        public string description { get; set; }

        [JsonProperty("Location")]
        public string location { get; set; }

        [JsonProperty("ShopConfiguration")]
        public ShopConfiguration config { get; set; }

        [JsonProperty("PlatformLink")]
        public string platformLink { get; set; }

        [JsonProperty("Categories")]
        public List<string> categories { get; set; }

        [JsonProperty("Items")]
        public List<Item> itemList { get; set; }
    }

    public partial class ShopConfiguration
    {
        [JsonProperty("Hours")]
        public string hours { get; set; }
        [JsonProperty("TakeAway")]
        public bool takeaway { get; set; }
        [JsonProperty("Delivery")]
        public bool delivery { get; set; }
    }
}
