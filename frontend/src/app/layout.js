import "./globals.css";
import Link from "next/link";
import Icons from "@/components/Icons";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";

export const metadata = {
    title: "To-Do list Application"
};

const MENU_ITEM = [
    {name: "Dashboard", href: "/", icon: "house" },
    {name: "List", href: "/list", icon: "align-left" },
    // {name: "Table", href: "/table", icon: "table" },
    // {name: "Calendar", href: "/calendar", icon: "calendar" },
];

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">

                    {/*Logo Header*/}
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <Icons name="layout-list" className="h-6 w-6"/>
                            <span className="">To-Do List</span>
                        </Link>
                    </div>

                    {/*Left Menu Bar*/}
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            {
                                MENU_ITEM.map( (item, index) => {
                                    return (
                                        <Link key="" href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                                            <Icons name={item.icon} className="h-4 w-4"/>
                                            {item.name}
                                        </Link>
                                    );
                                })
                            }
                        </nav>
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                {/*Top Menu Bar*/}
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Icons name="menu" className="h-5 w-5"/>
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>

                        {/*MV: Left Menu Bar*/}
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium">
                                {
                                    MENU_ITEM.map( (item, index) => {
                                        return (
                                            <Link key="" href={item.href} className="flex items-center gap-2 text-lg font-semibold">
                                                <Icons name={item.icon} className="h-6 w-6"/>
                                                <span className="">{item.name}</span>
                                            </Link>
                                        );
                                    })
                                }
                            </nav>
                        </SheetContent>
                    </Sheet>
                </header>

                {/*Main Content*/}
                {children}
            </div>
        </div>
        </body>
        </html>
    );
}
