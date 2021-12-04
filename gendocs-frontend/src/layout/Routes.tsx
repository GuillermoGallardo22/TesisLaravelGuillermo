import React from "react";

import DashboardIcon from "@material-ui/icons/Dashboard";
import DateRangeIcon from "@material-ui/icons/DateRange";
import SettingsIcon from "@material-ui/icons/Settings";

import {EnumProfile} from "models/enums";

import Dashboard from "pages/private/Dashboard/Dashboard";
import ScheduleSetup from "pages/private/ScheduleSetup/ScheduleSetup";
import Settings from "pages/private/Settings/Settings";

interface IScreen {
    path: string,
    label: string,
    component: React.FC,
    icon: any,
    isAdminRoute?: boolean,
}

export const DEFAULT_ROUTE = "dashboard";

const ROUTES: IScreen[] = [
    // USER
    {
        path: DEFAULT_ROUTE,
        label: "Dashboard",
        component: Dashboard,
        icon: <DashboardIcon/>,
    },
    // ADMIN
    {
        path: "horario-reserva",
        label: "Horario",
        component: ScheduleSetup,
        icon: <DateRangeIcon/>,
        isAdminRoute: true,
    },
    {
        path: "configuracion",
        label: "Configuración",
        component: Settings,
        icon: <SettingsIcon/>,
        isAdminRoute: true,
    },
];

export const getRoutes = (p: EnumProfile) => ROUTES.filter(item => !item.isAdminRoute || p === EnumProfile.admin);

export const getAdminLinks = (p: EnumProfile) => ROUTES.filter(item => item.isAdminRoute && p === EnumProfile.admin);
export const getUserLinks = (p: EnumProfile) => ROUTES.filter(item => !item.isAdminRoute);
