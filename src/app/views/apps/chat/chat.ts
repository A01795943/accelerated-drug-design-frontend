import { Component } from '@angular/core';
import { ChatList } from './components/chat-list/chat-list'
import { Contacts } from './components/contacts/contacts'
import type { ContactType, GroupType, UserContactType } from './data'

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [Contacts, ChatList],
  templateUrl: './chat.html',
  styles: ``,
})
export class Chat {
  title = 'Chat';
  profileDetail!: ContactType | GroupType | UserContactType

  receiveDataFromChild(data: ContactType | GroupType | UserContactType) {
    this.profileDetail = data
  }
}
