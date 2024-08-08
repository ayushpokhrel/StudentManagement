namespace StudentManagement.Models
{
    public class AddAcademicInfoDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Degree { get; set; }
        public int EnrolledYear { get; set; }
        public string EnrolledProgram { get; set; }
        public string CurrentSemester { get; set; }
        public int Fee { get; set; }
    }
}
