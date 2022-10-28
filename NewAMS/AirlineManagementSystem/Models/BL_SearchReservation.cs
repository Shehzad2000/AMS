using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace AirlineManagementSystem.Models
{
    public class BL_SearchReservation
    {
        public string Name { get; set; }
        public int AirLineID { get; set; }
        public string CNIC { get; set; }
        public string ContactNo { get; set; }
        public string PassportNo { get; set; }
        public int Route { get; set; }
        public string CabinName { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public int Status { get; set; }
    }
    public class SearchReservationMainLogic
    {
        static string cs = ConfigurationManager.ConnectionStrings["con"].ConnectionString;

        public static List<BL_SearchReservation> GetData(int RID, int AID)
        {
            List<BL_SearchReservation> list = new List<BL_SearchReservation>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForSchedule", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", 0);
                cmd.Parameters.AddWithValue("@Route", RID);
                cmd.Parameters.AddWithValue("@AirLineID", AID);
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader();
                while (sdr.Read())
                {
                    list.Add(new BL_SearchReservation
                    {
                        Name = Convert.ToString(sdr["Name"]),
                        CNIC = Convert.ToString(sdr["CNIC"]),
                        ContactNo = Convert.ToString(sdr["ContactNo"]),
                        PassportNo = Convert.ToString(sdr["PassportNo"]),
                        Route = Convert.ToInt32(sdr["Route"]),
                        CabinName = Convert.ToString(sdr["CabinName"]),
                        DepartureTime = Convert.ToDateTime(sdr["DepartureTime"]),
                        ArrivalTime = Convert.ToDateTime(sdr["ArrivalTime"]),
                        Status = Convert.ToInt32(sdr["Status"]),

                    });
                }
                return list;
            }
        }

    }
}