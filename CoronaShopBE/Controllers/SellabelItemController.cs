using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CoronaShop.ServiceLibrary.Domains;
using CoronaShop.ServiceLibrary.Entities;

namespace CoronaShopBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SellabelItemController : ControllerBase
    {
        [HttpGet]
        public IActionResult AddNewSellableItem([FromQuery]SellableItemEntity sellableItemEntity)
        {
            var businessLogic = new SellableItem();
            businessLogic.SaveSellableItem(sellableItemEntity);
            return Ok();
        }

      

    }
}