import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { describe, beforeEach, it, expect, vi } from "vitest";
import { ThreadsService } from "./threads.service";
import { Thread } from "./entities/thread.entity";
import { User } from "../users/entity/user.entity";
import { Comment } from "../comments/entities/comment.entity";

const mockThreadRepository = {
  find: vi.fn(),
  findOne: vi.fn(),
  findOneBy: vi.fn(),
  create: vi.fn(),
  save: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
};

const mockCommentRepository = {
  find: vi.fn(),
  findOne: vi.fn(),
  findOneBy: vi.fn(),
  create: vi.fn(),
  save: vi.fn(),
  remove: vi.fn(),
};

const mockUserRepository = {
  findOneBy: vi.fn(),
  create: vi.fn(),
  save: vi.fn(),
};

describe("ThreadsService", () => {
  let service: ThreadsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ThreadsService,
        {
          provide: getRepositoryToken(Thread),
          useValue: mockThreadRepository,
        },
        {
          provide: getRepositoryToken(Comment),
          useValue: mockCommentRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = moduleRef.get<ThreadsService>(ThreadsService);
  });

  it("retrieves an array of threads successfully", async () => {
    const testThreads = [
      {
        id: "1",
        title: "first test title",
        body: "first test body",
        author: "first test author",
      },
      {
        id: "2",
        title: "second test title",
        body: "second test body",
        author: "second test author",
      },
    ];

    mockThreadRepository.find.mockResolvedValue(testThreads);
    const result = await service.findAll();

    expect(mockThreadRepository.find).toHaveBeenCalled();
    expect(result).toBe(testThreads);
  });

  it("throws a NotFoundException when there are no threads", async () => {
    mockThreadRepository.find.mockResolvedValue([]);

    await expect(service.findAll()).rejects.toThrow(NotFoundException);
  });

  it("retrieves a thread successfully", async () => {
    const testThread = {
      id: "1",
      title: "first test title",
      body: "first test body",
      author: "first test author",
    };
    const testComments: Comment[] = [];

    mockThreadRepository.findOneBy.mockResolvedValue(testThread);
    mockCommentRepository.find.mockResolvedValue(testComments);
    const result = await service.find("1");

    expect(mockThreadRepository.findOneBy).toHaveBeenCalledWith({ id: "1" });
    expect(result).toEqual({
      id: "1",
      title: "first test title",
      body: "first test body",
      author: "first test author",
      comments: [],
    });
  });

  it("throws a NotFoundException when the thread does not exist", async () => {
    mockThreadRepository.findOneBy.mockResolvedValue(null);

    await expect(service.find("999")).rejects.toThrow(NotFoundException);
  });

  it("creates a thread successfully", async () => {
    const testThreadDto = {
      title: "third test title",
      body: "third test body",
    };
    const testUser = { id: "2u", username: "Anna", password: "87654321" };

    mockUserRepository.findOneBy.mockResolvedValue(testUser);

    const createdThread = {
      ...testThreadDto,
      author: testUser,
    };
    mockThreadRepository.create.mockReturnValue(createdThread);
    mockThreadRepository.save.mockResolvedValue(createdThread);
    const result = await service.create(testUser.id, testThreadDto);

    expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
      id: testUser.id,
    });
    expect(result).toEqual(createdThread);
  });

  it("throws a NotFoundException when the user does not exist", async () => {
    mockUserRepository.findOneBy.mockResolvedValue(null);

    await expect(
      service.create("2u", { title: "test", body: "test" }),
    ).rejects.toThrow(NotFoundException);
  });

  it("removes a thread successfully", async () => {
    const testUser = { id: "3u", username: "James", password: "12341234" };
    mockUserRepository.findOneBy.mockResolvedValue(testUser);
    const testThread = {
      id: "4fourth",
      title: "fourth test title",
      body: "fourth test body",
      author: testUser,
    };
    const testComments = [{ id: "c1", body: "a comment" }];

    mockThreadRepository.findOne.mockResolvedValue(testThread);
    mockCommentRepository.find.mockResolvedValue(testComments);
    mockThreadRepository.remove.mockResolvedValue(testThread);
    mockCommentRepository.remove.mockResolvedValue(testComments);

    const result = await service.delete(testThread.id, testUser.id);

    expect(mockThreadRepository.findOne).toHaveBeenCalledWith({
      where: { id: testThread.id },
      relations: { author: true },
    });
    expect(mockThreadRepository.remove).toHaveBeenCalledWith(testThread);
    expect(mockCommentRepository.remove).toHaveBeenCalledWith(testComments);
    expect(result).toBe(true);
  });
});
