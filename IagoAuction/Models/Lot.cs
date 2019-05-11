using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Formatters.Xml;

namespace IagoAuction.Models
{
    public class Lot
    {
        public int Id { get; set; }
        
        public List<Painting> Paintings { get; set; }

        public List<Bid> Bids { get; set; }

        public int? AuctionId { get; set; }
        [ForeignKey("AuctionId")]
        public Auction Auction { get; set; }

        public Lot()
        {
            this.Paintings = new List<Painting>();
            this.Bids = new List<Bid>();
        }
    }
}
