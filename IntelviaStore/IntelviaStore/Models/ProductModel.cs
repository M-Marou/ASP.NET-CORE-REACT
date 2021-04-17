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

        public string ProductName { get; set; }

        public string Description { get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; }

        public string ImageName { get; set; }

        //public CategoriesModel Categories { get; set; }
    }
}
