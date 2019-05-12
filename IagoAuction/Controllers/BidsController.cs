using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IagoAuction.DAL;
using IagoAuction.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IagoAuction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public BidsController(DatabaseContext context)
        {
            _context = context;
        }

        // POST: api/Bids
        [HttpPost]
        public async Task<ActionResult<Auction>> MakeBid([FromForm]Bid bid)
        {
            _context.Bids.Add(bid);
            await _context.SaveChangesAsync();

            return Ok($"A bid of {bid.Value} has been successfully placed.");
        }
    }
}