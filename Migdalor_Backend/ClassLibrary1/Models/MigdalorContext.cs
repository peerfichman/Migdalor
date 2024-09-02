using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace ClassLibrary1.Models;


public partial class MigdalorContext : DbContext
{
    public MigdalorContext()
    {
    }

    public MigdalorContext(DbContextOptions<MigdalorContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TblActivity> TblActivities { get; set; }

    public virtual DbSet<TblAnnouncement> TblAnnouncements { get; set; }

    public virtual DbSet<TblDepartment> TblDepartments { get; set; }

    public virtual DbSet<TblFacility> TblFacilities { get; set; }

    public virtual DbSet<TblGoodMorningPolicy> TblGoodMorningPolicies { get; set; }

    public virtual DbSet<TblHobby> TblHobbies { get; set; }


    public virtual DbSet<TblObituary> TblObituaries { get; set; }

    public virtual DbSet<TblResident> TblResidents { get; set; }

    public virtual DbSet<TblResidentCommittee> TblResidentCommittee { get; set; }

    public virtual DbSet<TblResidentHasHobby> TblResidentHasHobbies { get; set; }
    public virtual DbSet<TblInitiative> TblInitiatives { get; set; }

    public virtual DbSet<TblResidentPartOfResidentCommittee> TblResidentPartOfResidentCommittees { get; set; }

    public virtual DbSet<TblResidentParticipatingInActivity> TblResidentParticipatingInActivities { get; set; }

    public virtual DbSet<TblResidentParticipatingInInitiative> TblResidentParticipatingInInitiatives { get; set; }

    public virtual DbSet<TblUser> TblUsers { get; set; }

    //    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
    //        => optionsBuilder.UseSqlServer("Server= ANITA-LAPTOP\\SQLEXPRESS01;Database=Migdalor;Trusted_Connection=True;Encrypt=false");


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var config = new ConfigurationBuilder().AddJsonFile("appsettings.json", false).Build();
        String connStr = config.GetConnectionString("DefaultConnectionString");
        optionsBuilder.UseSqlServer(connStr);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TblActivity>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tblActiv__CA8A5612C45EF4AB");

            entity.ToTable("tblActivity");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.ActivityName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Date)
                .HasColumnType("date");
            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");
            entity.Property(e => e.Description).HasColumnType("text");

        });

        modelBuilder.Entity<TblAnnouncement>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tblAnnou__9DE4455462081A7C");

            entity.ToTable("tblAnnouncement");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("Id");
            entity.Property(e => e.Content).HasColumnType("text");
            entity.Property(e => e.Date).HasColumnType("date");
            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");
        });

        modelBuilder.Entity<TblDepartment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tblDepar__B2079BCD9D4792DD");

            entity.ToTable("tblDepartment");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("Id");
            entity.Property(e => e.DepartmentName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ManagerPhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false);            
            entity.Property(e => e.DepartmentManager)
                .HasMaxLength(20)
                .IsUnicode(false);         
            entity.Property(e => e.DepartmentDays)
                .HasMaxLength(50)
                .IsUnicode(false);            
            entity.Property(e => e.DepartmentHours)
                .HasMaxLength(50)
                .IsUnicode(false);           
            entity.Property(e => e.Description)
                .HasMaxLength(500)
                .IsUnicode(false);

        });

        modelBuilder.Entity<TblFacility>(entity =>
        {
            entity.HasKey(e => e.FacilityId).HasName("PK__tblFacil__5FB08B9484CB7724");

            entity.ToTable("tblFacility");

            entity.Property(e => e.FacilityId)
                .ValueGeneratedNever()
                .HasColumnName("FacilityID");
            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");
            entity.Property(e => e.FacilityName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.OperatingDays)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false);


        });

        modelBuilder.Entity<TblGoodMorningPolicy>(entity =>
        {

            entity.ToTable("tblGoodMorningPolicy");

      
            entity.Property(e => e.Date).HasColumnType("date");
            entity.Property(e => e.ResidentNumber).HasColumnType("int");

        });

        modelBuilder.Entity<TblHobby>(entity =>
        {
            entity.HasKey(e => e.HobbyNumber).HasName("PK__tblHobby__A636D7FD5324A946");

            entity.ToTable("tblHobby");

            entity.Property(e => e.HobbyNumber).ValueGeneratedNever();
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TblInitiative>(entity =>
        {
            entity.HasKey(e => e.InitiativeNumber).HasName("PK__tblIniti__EF9DCC43502E5FB3");

            entity.ToTable("tblInitiative");

            entity.Property(e => e.InitiativeNumber).ValueGeneratedNever();
            entity.Property(e => e.Date).HasColumnType("date");
            entity.Property(e => e.InitiativeName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.InitiativeType)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.InvitationDescription).HasColumnType("text");
            entity.Property(e => e.Location)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TblObituary>(entity =>
        {
            entity.HasKey(e => e.ObituaryNumber).HasName("PK__tblObitu__2EA5019237CD640A");

            entity.ToTable("tblObituary");

            entity.Property(e => e.ObituaryNumber).ValueGeneratedNever();
            entity.Property(e => e.Date).HasColumnType("date");
            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");
            entity.Property(e => e.Description).HasColumnType("text");
            
        });

        modelBuilder.Entity<TblResident>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tblResid__46C9AFCA188A5876");

            entity.ToTable("tblResident");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.AboutMe).HasColumnType("text");
            entity.Property(e => e.CurrentAddress)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.DateOfBirth).HasColumnType("date");
            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ResidentID)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("ResidentID");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.PreviousAddress)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Profession)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TblResidentCommittee>(entity =>
        {
            entity.HasKey(e => e.CommitteeId).HasName("PK__tblResid__2AD341214122D1EB");

            entity.ToTable("tblResidentCommittee");

            entity.Property(e => e.CommitteeId)
                .ValueGeneratedNever()
                .HasColumnName("CommitteeID");
            entity.Property(e => e.CommitteeName)
                .HasMaxLength(100)
                .IsUnicode(false);


          
        });

        modelBuilder.Entity<TblResidentHasHobby>(entity =>
        {
            entity.HasKey(e => new { e.HobbyNumber, e.ResidentNumber }).HasName("PK__tblResid__125A4D010FF04B52");

            entity.ToTable("tblResidentHasHobby");

            entity.Property(e => e.IsActive)
                .HasDefaultValueSql("((0))")
                .HasColumnName("isActive");
        

        });

        modelBuilder.Entity<TblResidentPartOfResidentCommittee>(entity =>
        {
            entity.HasKey(e => new { e.CommitteeId, e.ResidentNumber }).HasName("PK__tblResid__9EBFDBDD5EE39F2D");

            entity.ToTable("tblResidentPartOfResidentCommittee");

            entity.Property(e => e.CommitteeId).HasColumnName("CommitteeID");
            entity.Property(e => e.IsActive)
                .HasDefaultValueSql("((0))")
                .HasColumnName("isActive");

        });

        modelBuilder.Entity<TblResidentParticipatingInActivity>(entity =>
        {
            entity.HasKey(e => new { e.ActivityNumber, e.ResidentNumber });
            entity.Property(e => e.ActivityNumber)
                        .HasColumnName("ActivityNumber");

            entity.Property(e => e.ResidentNumber)
                        .HasColumnName("ResidentNumber");




            entity.ToTable("tblResidentParticipatingInActivity");


           
        });

        modelBuilder.Entity<TblResidentParticipatingInInitiative>(entity =>
        {
            entity.HasKey(e => new { e.InitiativeNumber, e.ResidentNumber }).HasName("PK__tblResid__5BF156BF35C6C9B1");

            entity.ToTable("tblResidentParticipatingInInitiative");

        });

        modelBuilder.Entity<TblUser>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__tblUsers__1788CCAC83AE0BF2");

            entity.ToTable("tblUsers");

            entity.HasIndex(e => e.Username, "UQ__tblUsers__536C85E45BC6ECF0").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.RoleName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false);
        });


       

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

}
