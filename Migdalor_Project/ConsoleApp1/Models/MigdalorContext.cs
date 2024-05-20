using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ConsoleApp1.Models;

public partial class MigdalorContext : DbContext
{
    public MigdalorContext()
    {
    }

    public MigdalorContext(DbContextOptions<MigdalorContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TblResidentHasHobby> TblResidentHasHobbies { get; set; }

    public virtual DbSet<TblResidentPartOfResidentCommittee> TblResidentPartOfResidentCommittees { get; set; }

    public virtual DbSet<TblResidentParticipatingInActivity> TblResidentParticipatingInActivities { get; set; }

    public virtual DbSet<TblResidentParticipatingInInitiative> TblResidentParticipatingInInitiatives { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=ANITA-LAPTOP\\SQLEXPRESS01;Database=Migdalor;Trusted_Connection=True;Encrypt=false");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
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
            entity.HasKey(e => new { e.ActivityNumber, e.ResidentNumber }).HasName("PK__tblResid__7EE6CCEEE256A807");

            entity.ToTable("tblResidentParticipatingInActivity");

            entity.Property(e => e.IsActive)
                .HasDefaultValueSql("((0))")
                .HasColumnName("isActive");
        });

        modelBuilder.Entity<TblResidentParticipatingInInitiative>(entity =>
        {
            entity.HasKey(e => new { e.InitiativeNumber, e.ResidentNumber }).HasName("PK__tblResid__5BF156BF35C6C9B1");

            entity.ToTable("tblResidentParticipatingInInitiative");

            entity.Property(e => e.IsActive)
                .HasDefaultValueSql("((0))")
                .HasColumnName("isActive");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
