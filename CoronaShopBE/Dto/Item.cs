using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoronaShopBE.Dto
{
    public partial class Item
    {
        [JsonProperty("Name")]
        public string name { get; set; }

        [JsonProperty("Id")]
        public string id { get; set; }

        [JsonProperty("Description")]
        public string description { get; set; }

        [JsonProperty("Price")]
        public float price { get; set; }

        [JsonProperty("Category")]
        public string category { get; set; }

        [JsonProperty("ImgLink")]
        public string imgLink { get; set; }

        [JsonProperty("Unit")]
        public string unit { get; set; }
    }

    public class SellerItem
    {
        [JsonProperty("Item")]
        public Item item { get; set; }

        [JsonProperty("Quantity")]
        public int quantity { get; set; }

    }

    public class BuyerItem
    {
        [JsonProperty("Item")]
        public Item item { get; set; }

        [JsonProperty("Quantity")]
        public int quantity { get; set; }

        [JsonProperty("Comment")]
        public string comment { get; set; }

    }
}
