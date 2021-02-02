package com.ensa.e_banking.entities;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table
public class Meeting{
    @Id  @GeneratedValue
    private Long id;
    private Date start;
    private Date end;
    private String title;


    @ManyToOne
    @JoinColumn(name="id_agent")
    private Agent agent;

    public Meeting(Long id, Date start, Date end, String object, Agent agent) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.title= object;
        this.agent = agent;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String object) {
        this.title= object;
    }

    public Agent getAgent() {
        return agent;
    }

    public void setAgent(Agent agent) {
        this.agent = agent;
    }

    public Meeting() {

    }
}
