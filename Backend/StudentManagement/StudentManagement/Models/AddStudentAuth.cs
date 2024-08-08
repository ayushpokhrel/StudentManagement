﻿using Microsoft.EntityFrameworkCore;

namespace StudentManagement.Models
{
 
    public class AddStudentAuth
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
    }
}
