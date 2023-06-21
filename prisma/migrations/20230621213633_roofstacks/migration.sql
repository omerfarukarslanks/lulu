-- CreateTable
CREATE TABLE "Translation" (
    "id" SERIAL NOT NULL,
    "english" TEXT NOT NULL,
    "turkish" TEXT NOT NULL,
    "german" TEXT NOT NULL,
    "russian" TEXT NOT NULL,
    "customerId" INTEGER NOT NULL,
    "pageId" INTEGER NOT NULL,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
