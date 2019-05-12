using IagoAuction.DAL;
using IagoAuction.DTOs;
using IagoAuction.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IagoAuction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public AuctionsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Auctions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Auction>>> GetAuctions()
        {
            var auctions = await _context.Auctions
                .Include(auction => auction.Lots)
                .ThenInclude(lot => lot.Bids)
                .ThenInclude(bid => bid.Bidder).
                ToListAsync();
            return auctions;
        }

        // GET: api/Auctions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Auction>> GetAuction(int id)
        {
            var auctions = await _context.Auctions
                .Include(includedAuction => includedAuction.Lots)
                .ThenInclude(lot => lot.Bids)
                .ThenInclude(bid => bid.Bidder)
                .Include(includedAuction => includedAuction.Lots)
                .ThenInclude(lot => lot.Painting)
                .ToListAsync();

            var auction = auctions.Where(filteredAuction =>
                    filteredAuction.Id == id)
                   .FirstOrDefault();


            if (auction == null)
            {
                return NotFound();
            }

            return auction;
        }

        // GET: api/Auctions/Painting/5
        [HttpGet("painting/{id}")]
        public async Task<ActionResult<Auction>> GetAuctionContainingPainting(int id)
        {
            var auctions = await _context.Auctions
                .Include(includedAuction => includedAuction.Lots)
                .ThenInclude(lot => lot.Bids)
                .ThenInclude(bid => bid.Bidder)
                .ToListAsync();

            var auction = auctions.Where(filteredAuction =>
                    filteredAuction.Lots.Any(lot => lot.PaintingId == id))
                .FirstOrDefault();

            return auction;
        }

        // GET: api/Auctions/2018/5
        [HttpGet("{year}/{month}")]
        public async Task<ActionResult<IEnumerable<Auction>>> GetAuctionsByMonth(int year, int month)
        {
            var auctions = await _context.Auctions
            .Include(auction => auction.Lots)
            .ThenInclude(lot => lot.Bids)
            .ThenInclude(bid => bid.Bidder)
            .ToListAsync();

            auctions = auctions.Where(auction =>
                auction.StartDate.Value.Year == year
                && auction.StartDate.Value.Month == month)
                .ToList();

            return auctions;
        }

        // PUT: api/Auctions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAuction([FromForm] AuctionDto auctionDto, int id)
        {

            if (!AuctionExists(id))
            {
                return NotFound();
            }

            Auction auction = new Auction
            {
                Id = auctionDto.Id,
                Title = auctionDto.Title,
                Description = auctionDto.Description,
                StartDate = auctionDto.StartDate,
                EndDate = auctionDto.EndDate
            };

            foreach (int paintingId in auctionDto.PaintingIds)
            {
                Lot lot = await this.FetchOrCreateLotAsync(paintingId, auctionDto.Id);
                if (lot != null)
                {
                    auction.Lots.Add(lot);
                }
            }

            _context.Entry(auction).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return Ok($"Successfully updated {auction.Title} auction.");
        }

        // POST: api/Auctions
        [HttpPost]
        public async Task<ActionResult<Auction>> PostAuction([FromForm]AuctionDto auctionDto)
        {
            Auction auction = new Auction
            {
                Id = auctionDto.Id,
                Title = auctionDto.Title,
                Description = auctionDto.Description,
                StartDate = auctionDto.StartDate,
                EndDate = auctionDto.EndDate
            };

            _context.Auctions.Add(auction);
            await _context.SaveChangesAsync();

            foreach (int paintingId in auctionDto.PaintingIds)
            {
                Lot lot = await this.FetchOrCreateLotAsync(paintingId, auction.Id);
                if (lot != null)
                {
                    auction.Lots.Add(lot);
                }
            }

            _context.Entry(auction).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok($"Auction {auction.Title} has been successfully added.");
        }

        // DELETE: api/Auctions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Auction>> DeleteAuction(int id)
        {
            var auction = await _context.Auctions
                .Include(requiredAuction => requiredAuction.Lots)
                .FirstOrDefaultAsync(requiredAuction => requiredAuction.Id == id);
            if (auction == null)
            {
                return NotFound();
            }

            foreach (Lot lot in auction.Lots)
            {
                _context.Lots.Remove(lot);
            }
            await _context.SaveChangesAsync();

            _context.Auctions.Remove(auction);
            await _context.SaveChangesAsync();

            return Ok($"Successfully removed {auction.Title} auction");
        }

        private bool AuctionExists(int id)
        {
            return _context.Auctions.Any(e => e.Id == id);
        }

        private async Task<Lot> FetchOrCreateLotAsync(int paintingId, int auctionId)
        {
            var matchingLots = _context.Lots.Where(lot => lot.PaintingId == paintingId && lot.AuctionId == auctionId);

            if (matchingLots.Any())
            {
                return matchingLots.First();
            }

            Lot newLot = new Lot
            {
                PaintingId = paintingId,
                AuctionId = auctionId
            };

            _context.Lots.Add(newLot);
            await _context.SaveChangesAsync();

            return newLot;
        }

    }
}
