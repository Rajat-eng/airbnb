import { NextResponse } from "next/server";
import {getServerSession} from "next-auth";
import prisma from "@/app/libs/prismadb";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(
  request: Request, 
) {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.error();
    }
  const body = await request.json();
  const { 
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: session.user.id
    }
  });

  return NextResponse.json(listing);
}
