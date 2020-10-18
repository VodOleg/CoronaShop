using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoronaShopBE.BusinessLogic;
using CoronaShopBE.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CoronaShopBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublicController : ControllerBase
    {
        PublicManager m_pPublicManager;

        public PublicController()
        {
            m_pPublicManager = CoronaShopService.getPublicManager();
        }

        [HttpGet("{shopID}")]
        public IActionResult GetShop(string shopID)
        {
            Shop shop = m_pPublicManager.GetShop(shopID);

            Log.Write($"requested shop id {shopID} got ");
            return Ok("ok oleg");
        }
    }
}