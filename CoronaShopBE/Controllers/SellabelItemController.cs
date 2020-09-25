using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CoronaShopBE.Dto;

namespace CoronaShopBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SellabelItemController : ControllerBase
    {
        //[HttpPost]
        //public IActionResult AddNewSellableItem([FromQuery]SellableItemEntity sellableItemEntity)
        //{
        //    var businessLogic = new SellableItem();
        //    businessLogic.SaveSellableItem(sellableItemEntity);
        //    return Ok();
        //}
        //[HttpPost]

        [Route("test")]
        public IActionResult test ([FromBody] test d)
        {

            Console.WriteLine(d.ToString());
            string response = "{\"response\":\"oleg\",\"data\":\"somedata\"}";
            return Ok(response);
        }

      

    }
}