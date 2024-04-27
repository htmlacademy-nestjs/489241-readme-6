-- CreateEnum
CREATE TYPE "PostState" AS ENUM ('Draft', 'Published');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('Video', 'Text', 'Quote', 'Photo', 'Link');

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "state" "PostState" NOT NULL DEFAULT 'Draft',
ADD COLUMN     "type" "PostType" NOT NULL DEFAULT 'Text';
