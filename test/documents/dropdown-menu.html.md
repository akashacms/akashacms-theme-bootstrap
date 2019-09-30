---
title: Dropdown Menu test
layout: default.html.ejs
---

<dropdown-menu id="menu1" label="Menu 1">
    <dropdown-menu-item href="/some/where/1" label="Label 1" active="true"></dropdown-menu-item>
    <dropdown-menu-item href="/some/where/2" label="Label 2"></dropdown-menu-item>
    <dropdown-menu-item href="/some/where/3" label="Label 3"></dropdown-menu-item>
</dropdown-menu>

<dropdown-menu id="menu2" label="Menu 2"
    right-aligned="true"
    button-type="hollow"
    button-size="3"
    additional-classes="class1 class2">
    <dropdown-menu-item href="/some/where/else/1" label="Label 1" active="true"></dropdown-menu-item>
    <dropdown-menu-item href="/some/where/else/2" label="Label 2"></dropdown-menu-item>
    <dropdown-menu-item href="/some/where/else/disabled" label="Disabled" disabled="true"></dropdown-menu-item>
</dropdown-menu>

<dropdown-menu id="menu3" label="Menu w/ Buttons">
    <dropdown-menu-button href="/some/where/button/1" label="Label 1" active="true"></dropdown-menu-button>
    <dropdown-menu-button href="/some/where/button/2" label="Label 2"></dropdown-menu-button>
    <dropdown-menu-button href="/some/where/button/disabled" label="Disabled" disabled="true"></dropdown-menu-button>
</dropdown-menu>

<dropdown-menu id="menu4" label="Menu w/ header and divider">
    <dropdown-menu-header label="Header text"/>
    <dropdown-menu-item href="/some/where/1" label="Label 1" active="true"></dropdown-menu-item>
    <dropdown-menu-button href="/some/where/button/2" label="Label 2"></dropdown-menu-button>
    <dropdown-menu-button href="/some/where/button/disabled" label="Disabled" disabled="true"></dropdown-menu-button>
    <dropdown-menu-divider/>
    <p>Now is the time for all good text to appear in the menu.</p>
</dropdown-menu>
