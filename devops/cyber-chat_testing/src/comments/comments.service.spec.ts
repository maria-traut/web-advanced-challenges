import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { describe, beforeEach, it, expect, vi } from "vitest";
import { CommentsService } from "./comments.service";
import { Comment } from "./entities/comment.entity";
import { Thread } from "../threads/entities/thread.entity";
import { NotFoundException } from "@nestjs/common";
import { User } from "../users/entity/user.entity";

const mockCommentRepository = {
  findOne: vi.fn(),
  findOneBy: vi.fn(),
  create: vi.fn(),
  save: vi.fn(),
};

const mockThreadRepository = {
  find: vi.fn(),
  findOneBy: vi.fn(),
  create: vi.fn(),
  save: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockUserRepository = {
  findOneBy: vi.fn(),
  create: vi.fn(),
  save: vi.fn(),
};

describe("CommentsService", () => {
  let service: CommentsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(Comment),
          useValue: mockCommentRepository,
        },
        {
          provide: getRepositoryToken(Thread),
          useValue: mockThreadRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = moduleRef.get<CommentsService>(CommentsService);
  });

  it("creates a comment successfully", async () => {
    const testUser = { id: "1u", username: "Mia", password: "12345678" };
    const testThread = {
      id: "1",
      title: "first test title",
      body: "first test body",
      author: testUser,
    };
    const testComment = {
      body: "first comment test body",
    };

    mockUserRepository.findOneBy.mockResolvedValue(testUser);
    mockThreadRepository.findOneBy.mockResolvedValue(testThread);

    const createdComment = {
      ...testComment,
      thread: testThread,
      author: testUser,
    };
    mockCommentRepository.create.mockReturnValue(createdComment);
    mockCommentRepository.save.mockResolvedValue(createdComment);
    const result = await service.create(
      testThread.id,
      testUser.id,
      testComment,
    );

    expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
      id: testUser.id,
    });
    expect(mockThreadRepository.findOneBy).toHaveBeenCalledWith({
      id: testThread.id,
    });
    expect(mockCommentRepository.create).toHaveBeenCalledWith({
      ...testComment,
      thread: testThread,
      author: testUser,
    });
    expect(result).toEqual(createdComment);
  });

  it("throws a NotFoundException when the user does not exist", async () => {
    mockUserRepository.findOneBy.mockResolvedValue(null);

    await expect(service.create("1", "999", { body: "test" })).rejects.toThrow(
      NotFoundException,
    );
  });

  it("throws a NotFoundException when the thread does not exist", async () => {
    mockUserRepository.findOneBy.mockResolvedValue({
      id: "1u",
      username: "Mia",
    });
    mockThreadRepository.findOneBy.mockResolvedValue(null);

    await expect(service.create("999", "1u", { body: "test" })).rejects.toThrow(
      NotFoundException,
    );
  });
});
