using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoronaShopBE.Dto
{
    public partial class OrderDetails
    {
        [JsonProperty("Name")]
        public string name { get; set; }
        [JsonProperty("mAddress")]
        public string mAddress { get; set; }
        [JsonProperty("mBuyerEmail")]
        public string mBuyerMail { get; set; }
        [JsonProperty("mPhoneNumber")]
        public string mPhoneNumber { get; set; }
    }
    public class Order
    {
        [JsonProperty("shopID")]
        public string shopID { get; set; }
        [JsonProperty("OrderID")]
        
        public string orderID { get; set; }
        [JsonProperty("OrderTimestamp")]
        public DateTime orderTimestamp { get; set; }
        [JsonProperty("OrderDetails")]
        public OrderDetails orderDetails { get; set; }
        [JsonProperty("items")]
        public List<Item> itemList { get; set; }
    }
}
