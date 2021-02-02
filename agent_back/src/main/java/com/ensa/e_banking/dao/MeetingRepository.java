package com.ensa.e_banking.dao;

import com.ensa.e_banking.entities.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    @Query("select distinct m from Meeting m where month(m.end) = ?1 or month(m.start) = ?1")
    List<Meeting> getMeetingByMonth(int month);
}
