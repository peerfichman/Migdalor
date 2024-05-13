using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

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

    public virtual DbSet<TblInitiative> TblInitiatives { get; set; }

    public virtual DbSet<TblObituary> TblObituaries { get; set; }

    public virtual DbSet<TblResident> TblResidents { get; set; }

    public virtual DbSet<TblResidentCommittee> TblResidentCommittees { get; set; }

    public virtual DbSet<TblUser> TblUsers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server= ANITA-LAPTOP\\SQLEXPRESS01;Database=Migdalor;Trusted_Connection=True;Encrypt=false");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TblActivity>(entity =>
        {
            entity.HasKey(e => e.ActivityNumber).HasName("PK__tblActiv__CA8A5612C45EF4AB");

            entity.ToTable("tblActivity");

            entity.Property(e => e.ActivityNumber).ValueGeneratedNever();
            entity.Property(e => e.ActivityName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Date).HasColumnType("date");
            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");

            entity.HasOne(d => d.Department).WithMany(p => p.TblActivities)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK__tblActivi__Depar__2F10007B");

            entity.HasMany(d => d.ResidentNumbers).WithMany(p => p.ActivityNumbers)
                .UsingEntity<Dictionary<string, object>>(
                    "TblResidentParticipatingInActivity",
                    r => r.HasOne<TblResident>().WithMany()
                        .HasForeignKey("ResidentNumber")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__tblReside__Resid__32E0915F"),
                    l => l.HasOne<TblActivity>().WithMany()
                        .HasForeignKey("ActivityNumber")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__tblReside__Activ__31EC6D26"),
                    j =>
                    {
                        j.HasKey("ActivityNumber", "ResidentNumber").HasName("PK__tblResid__7EE6CCEEE256A807");
                        j.ToTable("tblResidentParticipatingInActivity");
                    });
        });

        modelBuilder.Entity<TblAnnouncement>(entity =>
        {
            entity.HasKey(e => e.AnnouncementId).HasName("PK__tblAnnou__9DE4455462081A7C");

            entity.ToTable("tblAnnouncement");

            entity.Property(e => e.AnnouncementId)
                .ValueGeneratedNever()
                .HasColumnName("AnnouncementID");
            entity.Property(e => e.Content).HasColumnType("text");
            entity.Property(e => e.Date).HasColumnType("date");
            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");

            entity.HasOne(d => d.Department).WithMany(p => p.TblAnnouncements)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK__tblAnnoun__Depar__35BCFE0A");
        });

        modelBuilder.Entity<TblDepartment>(entity =>
        {
            entity.HasKey(e => e.DepartmentId).HasName("PK__tblDepar__B2079BCD9D4792DD");

            entity.ToTable("tblDepartment");

            entity.Property(e => e.DepartmentId)
                .ValueGeneratedNever()
                .HasColumnName("DepartmentID");
            entity.Property(e => e.DepartmentName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Username)
                .HasMaxLength(50)
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

            entity.HasOne(d => d.Department).WithMany(p => p.TblFacilities)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK__tblFacili__Depar__45F365D3");
        });

        modelBuilder.Entity<TblGoodMorningPolicy>(entity =>
        {
            entity.HasKey(e => e.IdentificationNumber).HasName("PK__tblGoodM__9CD146950D8B2485");

            entity.ToTable("tblGoodMorningPolicy");

            entity.Property(e => e.IdentificationNumber).ValueGeneratedNever();
            entity.Property(e => e.DateTime).HasColumnType("datetime");
            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");

            entity.HasOne(d => d.Department).WithMany(p => p.TblGoodMorningPolicies)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK__tblGoodMo__Depar__4CA06362");
        });

        modelBuilder.Entity<TblHobby>(entity =>
        {
            entity.HasKey(e => e.HobbyNumber).HasName("PK__tblHobby__A636D7FD5324A946");

            entity.ToTable("tblHobby");

            entity.Property(e => e.HobbyNumber).ValueGeneratedNever();
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasMany(d => d.ResidentNumbers).WithMany(p => p.HobbyNumbers)
                .UsingEntity<Dictionary<string, object>>(
                    "TblResidentHasHobby",
                    r => r.HasOne<TblResident>().WithMany()
                        .HasForeignKey("ResidentNumber")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__tblReside__Resid__2C3393D0"),
                    l => l.HasOne<TblHobby>().WithMany()
                        .HasForeignKey("HobbyNumber")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__tblReside__Hobby__2B3F6F97"),
                    j =>
                    {
                        j.HasKey("HobbyNumber", "ResidentNumber").HasName("PK__tblResid__125A4D010FF04B52");
                        j.ToTable("tblResidentHasHobby");
                    });
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

            entity.HasOne(d => d.ResidentNumberNavigation).WithMany(p => p.TblInitiatives)
                .HasForeignKey(d => d.ResidentNumber)
                .HasConstraintName("FK__tblInitia__Resid__38996AB5");

            entity.HasMany(d => d.ResidentNumbers).WithMany(p => p.InitiativeNumbers)
                .UsingEntity<Dictionary<string, object>>(
                    "TblResidentParticipatingInInitiative",
                    r => r.HasOne<TblResident>().WithMany()
                        .HasForeignKey("ResidentNumber")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__tblReside__Resid__3C69FB99"),
                    l => l.HasOne<TblInitiative>().WithMany()
                        .HasForeignKey("InitiativeNumber")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__tblReside__Initi__3B75D760"),
                    j =>
                    {
                        j.HasKey("InitiativeNumber", "ResidentNumber").HasName("PK__tblResid__5BF156BF35C6C9B1");
                        j.ToTable("tblResidentParticipatingInInitiative");
                    });
        });

        modelBuilder.Entity<TblObituary>(entity =>
        {
            entity.HasKey(e => e.ObituaryNumber).HasName("PK__tblObitu__2EA5019237CD640A");

            entity.ToTable("tblObituary");

            entity.Property(e => e.ObituaryNumber).ValueGeneratedNever();
            entity.Property(e => e.Date).HasColumnType("date");
            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");
            entity.Property(e => e.Description).HasColumnType("text");

            entity.HasOne(d => d.Department).WithMany(p => p.TblObituaries)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK__tblObitua__Depar__49C3F6B7");

            entity.HasOne(d => d.ResidentNumberNavigation).WithMany(p => p.TblObituaries)
                .HasForeignKey(d => d.ResidentNumber)
                .HasConstraintName("FK__tblObitua__Resid__48CFD27E");
        });

        modelBuilder.Entity<TblResident>(entity =>
        {
            entity.HasKey(e => e.ResidentNumber).HasName("PK__tblResid__46C9AFCA188A5876");

            entity.ToTable("tblResident");

            entity.Property(e => e.ResidentNumber).ValueGeneratedNever();
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
            entity.Property(e => e.Id)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("ID");
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

            entity.HasOne(d => d.Department).WithMany(p => p.TblResidents)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK__tblReside__Depar__267ABA7A");
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
            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");
            entity.Property(e => e.MeetingSummery).HasColumnType("text");

            entity.HasOne(d => d.Department).WithMany(p => p.TblResidentCommittees)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK__tblReside__Depar__3F466844");

            entity.HasMany(d => d.ResidentNumbers).WithMany(p => p.Committees)
                .UsingEntity<Dictionary<string, object>>(
                    "TblResidentPartOfResidentCommittee",
                    r => r.HasOne<TblResident>().WithMany()
                        .HasForeignKey("ResidentNumber")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__tblReside__Resid__4316F928"),
                    l => l.HasOne<TblResidentCommittee>().WithMany()
                        .HasForeignKey("CommitteeId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__tblReside__Commi__4222D4EF"),
                    j =>
                    {
                        j.HasKey("CommitteeId", "ResidentNumber").HasName("PK__tblResid__9EBFDBDD5EE39F2D");
                        j.ToTable("tblResidentPartOfResidentCommittee");
                        j.IndexerProperty<int>("CommitteeId").HasColumnName("CommitteeID");
                    });
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
