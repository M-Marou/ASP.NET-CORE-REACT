using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace IntelviaStore.Models
{
    public class ProductModel
    {
        [key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        [NotMapped]
        public IFormFile ImageUrl { get; set; }

        public CategoriesModel Categories { get; set; }
    }
}
