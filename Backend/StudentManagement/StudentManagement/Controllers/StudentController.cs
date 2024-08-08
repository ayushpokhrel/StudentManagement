using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentManagement.Data;
using StudentManagement.Models;
using StudentManagement.Models.Entities;

namespace StudentManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public StudentController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        [HttpGet]
        public IActionResult GetallStudents()
        {
            var allStudents = dbContext.Students.ToList();
            return Ok(allStudents);
        }


        [HttpPost]
        public ActionResult AddStudent(AddStudentDto addStudentDto)
        {
            var studentEntity = new Student()
            {
                Name = addStudentDto.Name,
                Email = addStudentDto.Email,
                Phone = addStudentDto.Phone,
                Grade = addStudentDto.Grade,

            };

            dbContext.Students.Add(studentEntity);
            dbContext.SaveChanges();
            return Ok(studentEntity);

        }


        [HttpPost]
        [Route("register")]
        public ActionResult <MyResponse> AddStudentAuth(AddStudentAuth addStudentAuth)
        {
         
            var studentCredentials = new StudentAuth()
            {
                Name= addStudentAuth.Name,
                Email= addStudentAuth.Email,
                Phone = addStudentAuth.Phone,
                Password= addStudentAuth.Password,

            };

            var existedUser = dbContext.StudentAuthentication.FirstOrDefault(e => e.Email == addStudentAuth.Email);
            if (existedUser != null)
            {
                var responsee = new MyResponse
                {
                    Success = false,
                    Message = "Email already registered"
                };
                return BadRequest(responsee);
            }

            dbContext.StudentAuthentication.Add(studentCredentials);
            dbContext.SaveChanges();
            var response = new MyResponse
            {
                Success = true,
                Message = "Registration Successful"
            };
           
            return Ok(response);

        }

        [HttpPost]
        [Route("login")]
        public ActionResult<IEnumerable<StudentAuth>> GetCredentials(StudentAuthLogin studentAuthLogin)
        {
            var student = dbContext.StudentAuthentication.FirstOrDefault(e => e.Email == studentAuthLogin.Email);
            if (student != null)
            {
                if (student.Password == studentAuthLogin.Password)
                {
                    var responsee = new MyResponse
                    {   
                        Username= student.Name,
                        Success = true,
                        Message = "Login success..." + student.Name
                    };
                    return Ok(responsee);
                }
                else
                {
                    var responsee = new MyResponse
                    {
                        Success = false,
                        Message = "Invalid Password"
                    };
                    return Unauthorized(responsee);
                }

            }
            else if (student == null)
            {
                var responsee = new MyResponse
                {
                    Success = false,
                    Message = "Email not found"
                };
                return NotFound(responsee);
            }
            else
            {
                return BadRequest();
            }
        }



        [HttpPut]
        [Route("{id:int}")]
        public IActionResult UpdateStudent(int id, UpdateStudentDto updateStudentDto)
        {
            var student = dbContext.Students.Find(id);
            if (student == null)
            {
                return NotFound();
            }

            student.Name = updateStudentDto.Name;
            student.Email = updateStudentDto.Email;
            student.Phone = updateStudentDto.Phone;
            student.Grade = updateStudentDto.Grade;

            dbContext.SaveChanges();
            return Ok(student);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult DeleteStudent(int id)
        {
            var student = dbContext.Students.Find(id);
            if (student == null)
            {
                return NotFound();
            }

            dbContext.Students.Remove(student);
            dbContext.SaveChanges();
            return Ok(student);
        }


        //Add Student Details

        [HttpPost]
        [Route("Students")]
        public IActionResult StudentList(AddStudentClassDto addStudentClassDto)
        {
            var studententity = new StudentDetails()
            {
                Name = addStudentClassDto.Name,
                Address = addStudentClassDto.Address,
                StudentID = addStudentClassDto.StudentID,
                Program = addStudentClassDto.Program,
                Email = addStudentClassDto.Email,
                Phone = addStudentClassDto.Phone,

            };
            var existedUser = dbContext.StudentDetails.FirstOrDefault(e => e.Email == addStudentClassDto.Email);
            if (existedUser != null)
            {
                var responsee = new MyResponse
                {
                    Success = false,
                    Message = "Email already registered"
                };
                return BadRequest(responsee.Message);
            }

            dbContext.StudentDetails.Add(studententity);
            dbContext.SaveChanges();
            

            return Ok("successfully registered");

        
        }

        [HttpGet]
        [Route("students")]
        public IActionResult getAllStudentsDetails()
        {
            var allStudentDetails = dbContext.StudentDetails.ToList();
            return Ok(allStudentDetails);
        }

        //Student Details Emds


        //Academic Info Starts
        [HttpPost]
        [Route("academicinfo")]
        public IActionResult addAcademicInfo(AddAcademicInfoDto addAcademicInfoDto)
        {
            var academicinfo = new AcademicInfo()
            {
                Email= addAcademicInfoDto.Email,
                Degree = addAcademicInfoDto.Degree,
                EnrolledProgram = addAcademicInfoDto.EnrolledProgram,
                EnrolledYear = addAcademicInfoDto.EnrolledYear,
                CurrentSemester = addAcademicInfoDto.CurrentSemester,
            };
            var existedUser = dbContext.AcademicInfo.FirstOrDefault(e => e.Email == addAcademicInfoDto.Email);
            if (existedUser != null)
            {
                var responsee = new MyResponse
                {
                    Success = false,
                    Message = "Email already registered"
                };
                return BadRequest(responsee.Message);
            }
            dbContext.AcademicInfo.Add(academicinfo);
            dbContext.SaveChanges();
            return Ok(academicinfo);
        }

        [HttpGet]
        [Route("academicinfo")]
        public IActionResult getAcademicInfo()
        {
            var academicinfo= dbContext.AcademicInfo.ToList();
            return Ok(academicinfo);
        }

    }
}

