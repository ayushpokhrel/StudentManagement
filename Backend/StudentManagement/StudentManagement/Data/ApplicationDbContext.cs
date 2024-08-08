using Microsoft.EntityFrameworkCore;
using StudentManagement.Models.Entities;

namespace StudentManagement.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Student> Students { get; set; }
        public DbSet<StudentAuth> StudentAuthentication { get; set; }
        public DbSet<StudentDetails> StudentDetails { get; set; }

        public DbSet<AcademicInfo> AcademicInfo { get; set; }

        }
}
