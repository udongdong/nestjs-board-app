import { Injectable } from '@nestjs/common';
import { Board, BoradStatus } from './boards.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(craeteBoardDto: CreateBoardDto) {
    const { title, description } = craeteBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoradStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id);
  }

  deleteBoardById(id: string) {
    this.boards = this.boards.filter((board) => board.id !== id);
  }

  updateBoardStatus(id: string, status: BoradStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
